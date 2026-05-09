import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LeaveApplications = () => {
  const navigate = useNavigate();
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        setLoading(true);
        
        const response = await fetch("https://staffleavehub-production.up.railway.app/api/leave-requests", {
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Server error: ${response.status} - ${errorData}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          throw new Error(`Expected JSON but got ${contentType}. Response: ${text}`);
        }
        
        const data = await response.json();
        setLeaveRequests(data.data || []);
        setError(null);
        
      } catch (error) {
        console.error("API Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveRequests();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getLeaveLetterUrl = (letterPath) => {
    if (!letterPath) return null;
    if (letterPath.startsWith('http://') || letterPath.startsWith('https://')) {
      return letterPath;
    }
    return `https://staffleavehub-production.up.railway.app/${letterPath.replace(/^\//, '')}`;
  };

  const handleBackClick = () => {
    navigate('/A_Dashboard');
  };

  return (
    <div style={styles.page}>
      
      {/* Floating Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.brand}>
          <div style={styles.logoMark}></div>
          Staff Leave Hub
        </div>
        <button 
          style={styles.backBtn}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#E2E8F0';
            e.currentTarget.style.transform = 'translateX(-3px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = '#F1F5F9';
            e.currentTarget.style.transform = 'none';
          }}
          onClick={handleBackClick}
        >
          ← Back to Dashboard
        </button>
      </nav>

      <main style={styles.main}>
        <div style={styles.header}>
          <h2 style={styles.title}>System Leave Status</h2>
          <p style={styles.subtitle}>View historical and current leave applications across all departments.</p>
        </div>

        {loading && <p style={{color: '#64748B'}}>Loading leave requests...</p>}
        {error && <p style={{color: '#E11D48', background: '#FFF1F2', padding: '15px', borderRadius: '8px'}}>Error: {error}</p>}

        {/* Modern Data Table */}
        <div style={styles.tableCard}>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Employee ID</th>
                  <th style={styles.th}>Name / Role</th>
                  <th style={styles.th}>Department</th>
                  <th style={styles.th}>Leave Type</th>
                  <th style={styles.th}>Date Range</th>
                  <th style={styles.th}>Reason</th>
                  <th style={styles.th}>Letter</th>
                  <th style={styles.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.length > 0 ? (
                  leaveRequests.map((request) => {
                    const letterUrl = getLeaveLetterUrl(request.leave_letter);
                    return (
                      <tr key={request.id} style={styles.tr}>
                        <td style={styles.td}>{request.employee_id}</td>
                        <td style={styles.td}>
                          <strong style={{color: '#0F172A'}}>{request.name}</strong><br/>
                          <span style={{fontSize: '0.85rem', color: '#64748B'}}>{request.designation}</span>
                        </td>
                        <td style={styles.td}>{request.department}</td>
                        <td style={styles.td}>{request.leave_type}</td>
                        <td style={styles.td}>
                          {formatDate(request.start_date)} - {formatDate(request.end_date)}
                        </td>
                        <td style={{...styles.td, maxWidth: '200px'}}>
                          {request.reason || "Not specified"}
                        </td>
                        <td style={styles.td}>
                          {letterUrl ? (
                            <a 
                              href={letterUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              style={styles.link}
                            >
                              View
                            </a>
                          ) : (
                            <span style={{color: '#94A3B8'}}>None</span>
                          )}
                        </td>
                        <td style={styles.td}>
                          <span style={styles.badge(request.status)}>
                            {request.status || "Pending"}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="8" style={styles.empty}>
                      {loading ? "Loading records..." : "No leave requests found in the system."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    background: '#F8FAFC',
    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 0,
    padding: 0
  },
  navbar: {
    width: '100%',
    height: '80px',
    background: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(0,0,0,0.05)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 40px',
    position: 'fixed',
    top: 0,
    zIndex: 100,
    boxSizing: 'border-box'
  },
  brand: {
    fontSize: '1.25rem',
    fontWeight: '800',
    color: '#0F172A',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  logoMark: {
    width: '32px',
    height: '32px',
    background: 'linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%)',
    borderRadius: '8px',
  },
  backBtn: {
    background: '#F1F5F9',
    color: '#0F172A',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '999px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  main: {
    marginTop: '120px',
    width: '100%',
    maxWidth: '1400px',
    padding: '0 20px 100px 20px',
    boxSizing: 'border-box'
  },
  header: {
    marginBottom: '40px'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#0F172A',
    margin: '0 0 10px 0',
    letterSpacing: '-0.02em'
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#64748B',
    margin: 0
  },
  tableCard: {
    background: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: '24px',
    overflow: 'hidden',
    boxShadow: '0 10px 25px rgba(0,0,0,0.03)'
  },
  tableWrapper: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left'
  },
  th: {
    padding: '20px 24px',
    background: '#F8FAFC',
    color: '#475569',
    fontSize: '0.85rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    borderBottom: '1px solid #E2E8F0',
    whiteSpace: 'nowrap'
  },
  tr: {
    transition: 'background 0.2s ease',
  },
  td: {
    padding: '20px 24px',
    borderBottom: '1px solid #F1F5F9',
    color: '#334155',
    fontSize: '0.95rem',
    lineHeight: '1.5'
  },
  link: {
    color: '#4F46E5',
    textDecoration: 'none',
    fontWeight: '600',
    background: '#EEF2FF',
    padding: '8px 16px',
    borderRadius: '999px',
    display: 'inline-block',
    transition: 'background 0.2s ease'
  },
  empty: {
    padding: '80px',
    textAlign: 'center',
    color: '#64748B',
    fontSize: '1.1rem'
  },
  badge: (status) => {
    let bg = '#F1F5F9';
    let color = '#475569';
    
    if (status === 'Approved') {
      bg = '#ECFDF5';
      color = '#059669';
    } else if (status === 'Rejected') {
      bg = '#FFF1F2';
      color = '#E11D48';
    } else if (status === 'Pending') {
      bg = '#FFF7ED';
      color = '#C2410C';
    }

    return {
      padding: '8px 16px',
      borderRadius: '999px',
      fontSize: '0.85rem',
      fontWeight: '700',
      background: bg,
      color: color,
      display: 'inline-block'
    };
  }
};

export default LeaveApplications;
