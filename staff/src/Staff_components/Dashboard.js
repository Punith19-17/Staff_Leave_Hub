import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const LeaveHub = () => {
  const [username, setUsername] = useState("Username");
  const [leaveData, setLeaveData] = useState({
    totalLeaves: 0,
    leavesApplied: 0,
    leavesApproved: 0,
    leavesRemaining: 0,
    loading: true
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://staffleavehub-production.up.railway.app/api/user-leave-data', {
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          setUsername(data.username || "Username");
          setLeaveData({
            totalLeaves: data.totalLeaves,
            leavesApplied: data.leavesApplied,
            leavesApproved: data.leavesApproved,
            leavesRemaining: data.leavesRemaining,
            loading: false
          });
        } else {
          setLeaveData(prev => ({ ...prev, loading: false }));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLeaveData(prev => ({ ...prev, loading: false }));
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/Login");
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const leaveModules = [
    { title: 'Total Leaves', value: leaveData.totalLeaves, key: 'total' },
    { title: 'Leaves Applied', value: leaveData.leavesApplied, key: 'applied' },
    { title: 'Leaves Approved', value: leaveData.leavesApproved, key: 'approved' },
    { title: 'Leaves Remaining', value: leaveData.leavesRemaining, key: 'remaining' },
  ];

  return (
    <div style={styles.body}>
      {/* Top Header */}
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Staff Leave Hub</h1>
        <div style={styles.userInfo}>
          <p style={styles.greeting}>Hello, <span style={{fontWeight: '700', color: '#1e293b'}}>{username}</span></p>
          <button 
            style={styles.logoutButton} 
            onClick={handleSubmit}
            onMouseOver={(e) => e.currentTarget.style.background = '#dc2626'}
            onMouseOut={(e) => e.currentTarget.style.background = '#ef4444'}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div style={styles.main}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <div style={styles.sidebarTitle}>Menu</div>
          {[
            { name: 'Profile', path: '/Profile' },
            { name: 'Leave Request', path:'/Leave_request' },
            { name: 'Leave Status', path: '/Leavestatus' },
            { name: 'Holidays', path: '/Staffholidays' },
            { name: 'Leave History', path: '/Leavehystory' }
          ].map((item) => (
            <div 
              key={item.name} 
              style={styles.navItem}
              onMouseOver={(e) => {
                e.currentTarget.style.background = styles.navItemHover.background;
                e.currentTarget.style.color = styles.navItemHover.color;
                e.currentTarget.style.transform = styles.navItemHover.transform;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#f8fafc';
                e.currentTarget.style.color = '#475569';
                e.currentTarget.style.transform = 'none';
              }}
              onClick={() => handleNavigation(item.path)}
            >
              {item.name}
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div style={styles.contentArea}>
          {leaveModules.map((module) => (
            <div 
              key={module.key}
              style={styles.statCard}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
            >
              <div style={styles.statTitle}>{module.title}</div>
              {leaveData.loading ? (
                <div style={styles.spinnerWrapper}>
                  <div className="spinner" style={styles.spinner}></div>
                </div>
              ) : (
                <div style={styles.statValue}>{module.value}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <footer style={styles.footer}>
        <p style={{margin: 0}}>Leave Management System © 2025. All rights reserved.</p>
      </footer>

      <style>
        {`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`}
      </style>
    </div>
  );
};

const styles = {
  body: {
    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    margin: 0,
    padding: 0,
    background: '#f0f4f8',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    background: 'white',
    padding: '15px 40px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  headerTitle: {
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: '800',
    background: 'linear-gradient(to right, #3b82f6, #2563eb)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  greeting: {
    margin: 0,
    fontSize: '1.05rem',
    color: '#64748b',
  },
  logoutButton: {
    background: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '8px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.95rem',
    transition: 'all 0.2s',
  },
  main: {
    display: 'flex',
    flex: 1,
    padding: '40px',
    gap: '40px',
    maxWidth: '1400px',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box',
  },
  sidebar: {
    width: '280px',
    background: 'white',
    borderRadius: '20px',
    padding: '30px 20px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    height: 'fit-content',
  },
  sidebarTitle: {
    fontSize: '0.9rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: '#94a3b8',
    fontWeight: '700',
    paddingLeft: '10px',
    marginBottom: '10px',
  },
  navItem: {
    padding: '16px 20px',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '1.05rem',
    fontWeight: '600',
    color: '#475569',
    background: '#f8fafc',
    transition: 'all 0.2s ease',
  },
  navItemHover: {
    background: '#eff6ff',
    color: '#2563eb',
    transform: 'translateX(6px)',
  },
  contentArea: {
    flex: 1,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
    alignContent: 'start',
  },
  statCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '35px 25px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    borderTop: '5px solid #3b82f6',
  },
  statTitle: {
    fontSize: '1.1rem',
    color: '#64748b',
    fontWeight: '600',
    marginBottom: '15px',
    textAlign: 'center',
  },
  statValue: {
    fontSize: '3.5rem',
    fontWeight: '800',
    color: '#1e293b',
    margin: 0,
    lineHeight: 1,
  },
  spinnerWrapper: {
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    width: '36px',
    height: '36px',
    border: '4px solid #f1f5f9',
    borderTopColor: '#3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  footer: {
    textAlign: 'center',
    padding: '20px',
    color: '#64748b',
    fontSize: '0.9rem',
  }
};

export default LeaveHub;
