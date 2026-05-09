import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LeaveApplications = () => {
  const navigate = useNavigate();
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [status, setStatus] = useState("Pending");
const [, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://staff-leave-hub.onrender.com/api/leave-requests", {
          headers: { 'Accept': 'application/json' }
        });
        if (!response.ok) throw new Error("Server error");
        const data = await response.json();
        setLeaveRequests(data.data || []);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaveRequests();
  }, []);

  useEffect(() => {
    if (selectedLeave) setStatus(selectedLeave.status || "Pending");
  }, [selectedLeave]);

  const handleStatusUpdate = async () => {
    try {
      const response = await fetch(`https://staff-leave-hub.onrender.com/api/leave-requests/${selectedLeave.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: status }),
      });
      if (response.ok) {
        const updatedRequests = leaveRequests.map(req => req.id === selectedLeave.id ? { ...req, status } : req);
        setLeaveRequests(updatedRequests);
        setSelectedLeave({ ...selectedLeave, status });
        alert("Status updated!");
      }
    } catch (error) {
      alert("Error updating leave status");
    }
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  const getLeaveLetterUrl = (path) => path ? (path.startsWith('http') ? path : `https://staff-leave-hub.onrender.com/${path.replace(/^\//, '')}`) : null;

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <div style={styles.brand}>
          <div style={styles.logoIcon}>A</div>
          Staff Leave Hub
        </div>
        <button style={styles.backBtn} onClick={() => navigate(-1)}>Back</button>
      </nav>

      <main style={styles.main}>
        <div style={styles.header}>
          <h1 style={styles.title}>Leave Applications</h1>
          <p style={styles.subtitle}>Review and process employee leave requests.</p>
        </div>

        {error && <div style={{color: 'red', marginBottom: '20px'}}>{error}</div>}

        <div style={styles.tableCard}>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Department</th>
                  <th style={styles.th}>Date Range</th>
                  <th style={styles.th}>Letter</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map((request) => (
                  <tr key={request.id}>
                    <td style={styles.td}>{request.employee_id}</td>
                    <td style={styles.td}><strong>{request.name}</strong><br/><span style={{fontSize:'12px', color:'#6B7280'}}>{request.designation}</span></td>
                    <td style={styles.td}>{request.department}</td>
                    <td style={styles.td}>{formatDate(request.start_date)} - {formatDate(request.end_date)}</td>
                    <td style={styles.td}>
                      {getLeaveLetterUrl(request.leave_letter) ? <a href={getLeaveLetterUrl(request.leave_letter)} target="_blank" rel="noreferrer" style={styles.link}>View</a> : "None"}
                    </td>
                    <td style={styles.td}>
                      <span style={styles.badge(request.status)}>{request.status || "Pending"}</span>
                    </td>
                    <td style={styles.td}>
                      <button style={styles.actionBtn} onClick={() => { setSelectedLeave(request); setShowDetails(true); }}>Review</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {leaveRequests.length === 0 && <div style={styles.empty}>No requests found.</div>}
          </div>
        </div>

        {/* Modal */}
        {showDetails && selectedLeave && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
              <h2 style={styles.modalTitle}>Process Application</h2>
              <div style={styles.detailGrid}>
                <div style={styles.detailRow}><span style={styles.detailLabel}>Employee:</span><span style={styles.detailValue}>{selectedLeave.name} ({selectedLeave.employee_id})</span></div>
                <div style={styles.detailRow}><span style={styles.detailLabel}>Role:</span><span style={styles.detailValue}>{selectedLeave.designation}, {selectedLeave.department}</span></div>
                <div style={styles.detailRow}><span style={styles.detailLabel}>Leave Type:</span><span style={styles.detailValue}>{selectedLeave.leave_type}</span></div>
                <div style={styles.detailRow}><span style={styles.detailLabel}>Duration:</span><span style={styles.detailValue}>{formatDate(selectedLeave.start_date)} to {formatDate(selectedLeave.end_date)}</span></div>
                <div style={styles.detailRow}><span style={styles.detailLabel}>Reason:</span><span style={styles.detailValue}>{selectedLeave.reason || "None"}</span></div>
              </div>
              <div style={{marginTop: '25px'}}>
                <label style={{display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4B5563'}}>Update Status</label>
                <select style={styles.select} value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <div style={styles.modalActions}>
                <button style={styles.closeBtn} onClick={() => setShowDetails(false)}>Cancel</button>
                <button style={styles.updateBtn} onClick={handleStatusUpdate}>Save Changes</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', background: '#F9FAFB', fontFamily: "'Inter', sans-serif" },
  navbar: { height: '70px', background: '#FFFFFF', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px' },
  brand: { fontSize: '20px', fontWeight: '800', color: '#111827', display: 'flex', alignItems: 'center', gap: '12px' },
  logoIcon: { background: '#4F46E5', color: 'white', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 'bold' },
  backBtn: { background: '#FFFFFF', color: '#4B5563', border: '1px solid #D1D5DB', padding: '8px 20px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' },
  main: { padding: '40px 60px', maxWidth: '1400px', margin: '0 auto' },
  header: { marginBottom: '30px' },
  title: { fontSize: '28px', fontWeight: '800', color: '#111827', margin: '0 0 8px 0' },
  subtitle: { fontSize: '15px', color: '#6B7280', margin: 0 },
  tableCard: { background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' },
  tableWrapper: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
  th: { padding: '16px 24px', background: '#F9FAFB', color: '#4B5563', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid #E5E7EB' },
  td: { padding: '16px 24px', borderBottom: '1px solid #F3F4F6', color: '#111827', fontSize: '14px' },
  link: { color: '#4F46E5', textDecoration: 'none', fontWeight: '600' },
  actionBtn: { background: '#EEF2FF', color: '#4F46E5', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' },
  empty: { padding: '40px', textAlign: 'center', color: '#6B7280' },
  badge: (status) => ({ padding: '6px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: '600', background: status === 'Approved' ? '#ECFDF5' : status === 'Rejected' ? '#FEF2F2' : '#FFFBEB', color: status === 'Approved' ? '#059669' : status === 'Rejected' ? '#DC2626' : '#D97706' }),
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(17,24,39,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 },
  modalContent: { background: '#FFFFFF', borderRadius: '24px', width: '500px', maxWidth: '90%', padding: '40px', boxShadow: '0 25px 50px rgba(0,0,0,0.15)' },
  modalTitle: { fontSize: '24px', fontWeight: '800', margin: '0 0 25px 0', color: '#111827' },
  detailGrid: { display: 'flex', flexDirection: 'column', gap: '15px' },
  detailRow: { display: 'flex', borderBottom: '1px solid #F3F4F6', paddingBottom: '15px' },
  detailLabel: { width: '120px', color: '#6B7280', fontWeight: '600', fontSize: '14px' },
  detailValue: { flex: 1, color: '#111827', fontSize: '14px', fontWeight: '500' },
  select: { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB', outline: 'none', fontSize: '15px', fontWeight: '500' },
  modalActions: { display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '30px' },
  closeBtn: { padding: '10px 20px', background: '#FFFFFF', color: '#4B5563', border: '1px solid #D1D5DB', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' },
  updateBtn: { padding: '10px 20px', background: '#4F46E5', color: '#FFFFFF', borderRadius: '8px', fontWeight: '600', border: 'none', cursor: 'pointer' }
};

export default LeaveApplications;
