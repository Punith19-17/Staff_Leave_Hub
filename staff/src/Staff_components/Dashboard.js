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

  // Logout handler
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/Login");
  };

  // Navigation function for the left menu items
  const handleNavigation = (path) => {
    navigate(path);
  };

  const styles = {
    body: {
      fontFamily: 'Arial, sans-serif',
      margin: 0,
      padding: 0,
      background: 'linear-gradient(135deg, #e0f7fa, #80deea)',
      height: '100vh',
    },
    leaveHubContainer: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    header: {
      background: 'linear-gradient(135deg, #e0f7fa, #80deea)',
      color: 'black',
      textAlign: 'center',
      padding: '3px',
    },
    userInfo: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px',
      background: '#ffffff',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    logoutButton: {
      background: '#ff4757',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      cursor: 'pointer',
      borderRadius: '5px',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'scale(1.05)',
      }
    },
    content: {
      display: 'flex',
      flex: 1,
      padding: '20px',
    },
    leftSide: {
      width: '25%',
      background: 'linear-gradient(135deg, #ffecd2, #fcb69f)',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      borderRadius: '5px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    leftSideList: {
      listStyle: 'none',
      padding: 0,
      width: '100%',
    },
    leftSideListItem: {
      padding: '20px',
      margin: '10px 0',
      background: 'linear-gradient(135deg, #f6d365, #fda085)',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '22px',
      textAlign: 'center',
      fontWeight: 'bold',
      color: 'black',
      transition: 'background 0.3s, transform 0.3s',
    },
    leftSideListItemHover: {
      background: 'linear-gradient(135deg, #fbc2eb, #a6c1ee)',
      transform: 'scale(1.05)',
    },
    rightSide: {
      width: '70%',
      marginLeft: '5%',
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px',
    },
    module: {
      background: 'linear-gradient(135deg, #a1c4fd, #c2e9fb)',
      padding: '30px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      borderRadius: '5px',
      textAlign: 'center',
      color: 'black',
      fontWeight: 'bold',
      transition: 'transform 0.3s',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '25px',
      position: 'relative',
      overflow: 'hidden',
    },
    moduleHover: {
      transform: 'scale(1.05)',
    },
    moduleTitle: {
      fontSize: '20px',
      marginBottom: '10px',
    },
    moduleValue: {
      fontSize: '32px',
      fontWeight: 'bolder',
    },
    loadingSpinner: {
      border: '4px solid rgba(0, 0, 0, 0.1)',
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      borderLeftColor: '#09f',
      animation: 'spin 1s linear infinite',
      margin: '20px auto',
    },
    footer: {
      background: 'linear-gradient(135deg, #e0f7fa, #80deea)',
      color: 'black',
      textAlign: 'center',
      padding: '10px',
      position: 'fixed',
      bottom: 0,
      width: '100%',
    },
    '@keyframes spin': {
      '0%': {
        transform: 'rotate(0deg)',
      },
      '100%': {
        transform: 'rotate(360deg)',
      },
    },
  };

  const leaveModules = [
    { title: 'Total Leaves', value: leaveData.totalLeaves, key: 'total' },
    { title: 'Leaves Applied', value: leaveData.leavesApplied, key: 'applied' },
    { title: 'Leaves Approved', value: leaveData.leavesApproved, key: 'approved' },
    { title: 'Leaves Remaining', value: leaveData.leavesRemaining, key: 'remaining' },
  ];

  return (
    <div style={styles.body}>
      <div style={styles.leaveHubContainer}>
        <header style={styles.header}>
          <h1>Staff Leave Hub</h1>
        </header>

        <div style={styles.userInfo}>
          <h2>Hello, {username}</h2>
          <button 
            style={styles.logoutButton} 
            onClick={handleSubmit}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
          >
            Logout
          </button>
        </div>

        <div style={styles.content}>
          <div style={styles.leftSide}>
            <ul style={styles.leftSideList}>
              {[
                { name: 'Profile', path: '/Profile' },
                { name: 'Leave Request', path:'/Leave_request' },
                { name: 'Leave Status', path: '/Leavestatus' },
                { name: 'Holidays', path: '/Staffholidays' },
                { name: 'Leave History', path: '/Leavehystory' }
              ].map((item) => (
                <li 
                  key={item.name} 
                  style={styles.leftSideListItem}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = styles.leftSideListItemHover.background;
                    e.currentTarget.style.transform = styles.leftSideListItemHover.transform;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #f6d365, #fda085)';
                    e.currentTarget.style.transform = 'none';
                  }}
                  onClick={() => handleNavigation(item.path)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>

          <div style={styles.rightSide}>
            {leaveModules.map((module) => (
              <div 
                key={module.key}
                style={styles.module}
                onMouseOver={(e) => e.currentTarget.style.transform = styles.moduleHover.transform}
                onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
              >
                <div style={styles.moduleTitle}>{module.title}</div>
                {leaveData.loading ? (
                  <div style={styles.loadingSpinner}></div>
                ) : (
                  <div style={styles.moduleValue}>{module.value}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <footer style={styles.footer}>
          <p>Leave Management System © 2025. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default LeaveHub;