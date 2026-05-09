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

  // Unique pastel backgrounds and matching vibrant text colors for each card
  const leaveModules = [
    { title: 'Total Leaves', value: leaveData.totalLeaves, key: 'total', bg: '#EBF2FF', color: '#4318FF', shadow: 'rgba(67, 24, 255, 0.2)' },
    { title: 'Leaves Applied', value: leaveData.leavesApplied, key: 'applied', bg: '#FEF3E6', color: '#FF8A4C', shadow: 'rgba(255, 138, 76, 0.2)' },
    { title: 'Leaves Approved', value: leaveData.leavesApproved, key: 'approved', bg: '#E8FAF0', color: '#05CD99', shadow: 'rgba(5, 205, 153, 0.2)' },
    { title: 'Leaves Remaining', value: leaveData.leavesRemaining, key: 'remaining', bg: '#FDECEF', color: '#EE5D50', shadow: 'rgba(238, 93, 80, 0.2)' },
  ];

  return (
    <div style={styles.dashboardContainer}>
      
      {/* Sidebar - Full Height */}
      <div style={styles.sidebar}>
        <div style={styles.brand}>Staff Leave Hub</div>
        <div style={styles.menu}>
          {[
            { name: 'Profile', path: '/Profile' },
            { name: 'Leave Request', path:'/Leave_request' },
            { name: 'Leave Status', path: '/Leavestatus' },
            // { name: 'Holidays', path: '/Staffholidays' },
            { name: 'Leave History', path: '/Leavehystory' }
          ].map((item) => (
            <div 
              key={item.name} 
              style={styles.navItem}
              onMouseOver={(e) => {
                e.currentTarget.style.background = styles.navItemHover.background;
                e.currentTarget.style.color = styles.navItemHover.color;
                e.currentTarget.style.boxShadow = styles.navItemHover.boxShadow;
                e.currentTarget.style.transform = 'translateX(5px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#A3AED0';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'none';
              }}
              onClick={() => handleNavigation(item.path)}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
      
      {/* Main Right Side Content */}
      <div style={styles.mainRight}>
        
        {/* Header - Glassmorphism Sticky Top */}
        <div style={styles.header}>
          <div style={styles.greeting}>
            Hello, <span style={styles.username}>{username}</span> 👋
          </div>
          <button 
            style={styles.logoutButton} 
            onClick={handleSubmit}
            onMouseOver={(e) => {
               e.currentTarget.style.background = '#FDECEF';
               e.currentTarget.style.color = '#EE5D50';
               e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
               e.currentTarget.style.background = '#FFFFFF';
               e.currentTarget.style.color = '#E31A1A';
               e.currentTarget.style.transform = 'none';
            }}
          >
            Logout
          </button>
        </div>
        
        {/* Dashboard Cards Area */}
        <div style={styles.content}>
          <div style={styles.statsGrid}>
            {leaveModules.map((module) => (
              <div 
                key={module.key}
                style={{
                  ...styles.statCard,
                  background: module.bg
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = `0 15px 30px ${module.shadow}`;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={styles.statTitle}>{module.title}</div>
                {leaveData.loading ? (
                  <div style={{height: '58px', display: 'flex', alignItems: 'center'}}>
                    <div className="spinner" style={{...styles.spinner, borderTopColor: module.color}}></div>
                  </div>
                ) : (
                  <div style={{...styles.statValue, color: module.color}}>{module.value}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <footer style={styles.footer}>
          Leave Management System © 2025. All rights reserved.
        </footer>
      </div>

      <style>
        {`
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        `}
      </style>
    </div>
  );
};

const styles = {
  dashboardContainer: {
    display: 'flex',
    height: '100vh',
    background: '#F4F7FE', // Beautiful soft grey-blue backdrop
    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    margin: 0,
    padding: 0,
    overflow: 'hidden' 
  },
  sidebar: {
    width: '280px',
    background: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    padding: '40px 20px',
    borderRight: '1px solid #E2E8F0',
    zIndex: 10,
    boxShadow: '4px 0 20px rgba(0,0,0,0.02)'
  },
  brand: {
    fontSize: '26px',
    fontWeight: '900',
    background: 'linear-gradient(to right, #4318FF, #868CFF)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '50px',
    textAlign: 'center',
    letterSpacing: '0.5px'
  },
  menu: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  navItem: {
    padding: '16px 20px',
    borderRadius: '16px',
    color: '#A3AED0',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.05rem',
  },
  navItemHover: {
    background: '#4318FF',
    color: '#FFFFFF',
    boxShadow: '0 10px 20px rgba(67, 24, 255, 0.2)'
  },
  mainRight: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto'
  },
  header: {
    height: '100px',
    minHeight: '100px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 40px',
    background: 'rgba(244, 247, 254, 0.8)',
    backdropFilter: 'blur(20px)',
    position: 'sticky',
    top: 0,
    zIndex: 5
  },
  greeting: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#2B3674',
    margin: 0
  },
  username: {
    color: '#4318FF'
  },
  logoutButton: {
    padding: '12px 28px',
    background: '#FFFFFF',
    color: '#E31A1A',
    borderRadius: '30px',
    fontWeight: '700',
    fontSize: '1rem',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
    transition: 'all 0.3s ease'
  },
  content: {
    padding: '20px 40px',
    flex: 1
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '30px'
  },
  statCard: {
    borderRadius: '24px',
    padding: '40px 30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.3s ease',
    cursor: 'default'
  },
  statTitle: {
    fontSize: '1.05rem',
    color: '#2B3674',
    fontWeight: '800',
    marginBottom: '20px',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  statValue: {
    fontSize: '48px',
    fontWeight: '900',
    margin: 0,
    lineHeight: 1
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid rgba(0,0,0,0.05)',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  footer: {
    textAlign: 'center',
    padding: '20px',
    color: '#A3AED0',
    fontSize: '0.9rem',
    fontWeight: '600'
  }
};

export default LeaveHub;
