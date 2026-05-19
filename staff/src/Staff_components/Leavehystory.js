import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useIsMobile from './useIsMobile';

const LeaveHub = ({ employeeId }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const handleBack = useCallback(() => { navigate('/dashboard'); }, [navigate]);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get('https://staff-leave-hub.onrender.com/api/employee/leaves', { withCredentials: true });
        if (response.data.success) {
          setLeaves(response.data.data);
        } else {
          setError(response.data.message || 'Failed to fetch leave data');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch leave data. Please try again later.');
        if (err.response?.status === 401) { handleBack(); }
      } finally { setLoading(false); }
    };
    fetchLeaves();
  }, [employeeId, handleBack]);

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved': return { bg: '#dcfce7', text: '#16a34a' };
      case 'pending': return { bg: '#fef3c7', text: '#d97706' };
      case 'rejected': return { bg: '#fee2e2', text: '#dc2626' };
      default: return { bg: '#f1f5f9', text: '#64748b' };
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLeaves = leaves.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(leaves.length / itemsPerPage);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div style={styles.page}>

      {/* Header — Back button LEFT, title CENTERED */}
      <header style={{ ...styles.header, padding: isMobile ? '14px 16px' : '15px 40px', position: 'relative', flexDirection: 'row' }}>
        <button style={styles.backButton} onClick={handleBack}>← Back</button>
        <h1 style={{
          ...styles.headerTitle,
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: isMobile ? '1.1rem' : '1.5rem',
          whiteSpace: 'nowrap'
        }}>
          Staff Leave Hub
        </h1>
        <div style={{ visibility: 'hidden', padding: '8px 16px', whiteSpace: 'nowrap', fontSize: '0.95rem' }}>← Back</div>
      </header>

      <div style={{ ...styles.container, padding: isMobile ? '16px' : '40px 20px' }}>
        {loading ? (
          <div style={styles.centerMessage}>
            <div className="spinner" style={styles.spinner}></div>
            <p>Loading leave history...</p>
          </div>
        ) : error ? (
          <div style={styles.errorMessage}>{error}</div>
        ) : leaves.length === 0 ? (
          <div style={styles.centerMessage}>
            <p style={{ fontSize: '1.2rem', color: '#64748b' }}>No leave records found</p>
            <button style={styles.primaryButton} onClick={() => window.location.reload()}>Refresh</button>
          </div>
        ) : (
          <div style={styles.tableCard}>
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>ID</th>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Type</th>
                    <th style={styles.th}>Start Date</th>
                    <th style={styles.th}>End Date</th>
                    <th style={styles.th}>Duration</th>
                    <th style={styles.th}>Reason</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Letter</th>
                  </tr>
                </thead>
                <tbody>
                  {currentLeaves.map((leave, index) => {
                    const statusColors = getStatusStyle(leave.status);
                    return (
                      <tr key={leave.id || index}>
                        <td style={styles.td}>{leave.employee_id}</td>
                        <td style={styles.tdBold}>{leave.name}</td>
                        <td style={styles.td}>{leave.leave_type}</td>
                        <td style={styles.td}>{formatDate(leave.start_date)}</td>
                        <td style={styles.td}>{formatDate(leave.end_date)}</td>
                        <td style={styles.td}>{leave.duration} Days</td>
                        <td style={{ ...styles.td, maxWidth: '180px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={leave.reason}>
                          {leave.reason}
                        </td>
                        <td style={styles.td}>
                          <span style={{ backgroundColor: statusColors.bg, color: statusColors.text, padding: '5px 10px', borderRadius: '20px', fontWeight: '700', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                            {leave.status}
                          </span>
                        </td>
                        <td style={styles.td}>
                          {leave.leave_letter ? (
                            <a href={`https://staff-leave-hub.onrender.com/uploads/${leave.leave_letter}`} target="_blank" rel="noopener noreferrer" style={styles.link}>View</a>
                          ) : 'N/A'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div style={styles.pagination}>
                <button style={currentPage === 1 ? styles.pageBtnDisabled : styles.pageBtn} onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>Previous</button>
                <span style={styles.pageText}>Page {currentPage} of {totalPages}</span>
                <button style={currentPage === totalPages ? styles.pageBtnDisabled : styles.pageBtn} onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

const styles = {
  page: { margin: 0, padding: 0, fontFamily: "'Inter', sans-serif", background: '#f0f4f8', minHeight: '100vh', display: 'flex', flexDirection: 'column' },
  header: { background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { margin: 0, fontWeight: '800', background: 'linear-gradient(to right, #3b82f6, #2563eb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  backButton: { padding: '8px 16px', cursor: 'pointer', border: '1px solid #cbd5e1', backgroundColor: 'white', color: '#475569', borderRadius: '8px', fontWeight: '600', flexShrink: 0, whiteSpace: 'nowrap' },
  container: { maxWidth: '1300px', margin: '0 auto', width: '100%', boxSizing: 'border-box' },
  centerMessage: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '40vh', color: '#64748b' },
  spinner: { width: '40px', height: '40px', border: '4px solid #e2e8f0', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '15px' },
  errorMessage: { background: '#fef2f2', color: '#ef4444', padding: '20px', borderRadius: '12px', textAlign: 'center', border: '1px solid #fca5a5' },
  primaryButton: { background: '#3b82f6', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', marginTop: '10px' },
  tableCard: { background: 'white', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', overflow: 'hidden' },
  tableWrapper: { overflowX: 'auto', WebkitOverflowScrolling: 'touch' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '650px' },
  th: { background: '#f8fafc', padding: '14px 16px', color: '#64748b', fontWeight: '700', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap' },
  td: { padding: '14px 16px', color: '#475569', fontSize: '0.9rem', borderBottom: '1px solid #f1f5f9' },
  tdBold: { padding: '14px 16px', color: '#1e293b', fontSize: '0.9rem', fontWeight: '600', borderBottom: '1px solid #f1f5f9' },
  link: { color: '#3b82f6', textDecoration: 'none', fontWeight: '600' },
  pagination: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: 'white', borderTop: '1px solid #f1f5f9' },
  pageText: { color: '#64748b', fontWeight: '500', fontSize: '0.9rem' },
  pageBtn: { padding: '8px 14px', background: 'white', border: '1px solid #cbd5e1', borderRadius: '8px', cursor: 'pointer', color: '#334155', fontWeight: '600' },
  pageBtnDisabled: { padding: '8px 14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#94a3b8', fontWeight: '600', cursor: 'not-allowed' }
};

export default LeaveHub;
