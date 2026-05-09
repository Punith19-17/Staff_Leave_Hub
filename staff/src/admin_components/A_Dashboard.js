import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ADashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    totalEmployees: 0,
    requestedLeaves: 0,
    approvedLeaves: 0,
    rejectedLeaves: 0
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("https://staffleavehub-production.up.railway.app/api/Adashboard");
        if (response.data) {
          setDashboardData({
            totalEmployees: response.data.totalEmployees || 0,
            requestedLeaves: response.data.requestedLeaves || 0,
            approvedLeaves: response.data.approvedLeaves || 0,
            rejectedLeaves: response.data.rejectedLeaves || 0
          });
        } else {
          setDashboardData({ totalEmployees: 0, requestedLeaves: 0, approvedLeaves: 0, rejectedLeaves: 0 });
        }
      } catch (error) {
        setDashboardData({ totalEmployees: 0, requestedLeaves: 0, approvedLeaves: 0, rejectedLeaves: 0 });
      }
    };
  
    fetchDashboardData();
  }, []);

  return (
    <div style={styles.body}>
      {/* Horizontal Header & Navbar */}
      <header style={styles.header}>
        <div style={styles.headerTop}>
          <h1 style={styles.mainHeading}>Staff Leave Hub</h1>
          <button 
            style={styles.backButton}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.color = '#1e293b'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#64748b'; }}
            onClick={() => navigate("/A_Login")}
          >
            Logout / Back
          </button>
        </div>
        
        {/* Top Navigation */}
        <div style={styles.navbar}>
          {[
            { name: "Employees", path: "/EmployeeInfo" },
            { name: "Attendance", path: "/Attendance" },
            { name: "Leave Details", path: "/A_leaveapplications" },
            { name: "Holidays", path: "/A_holidays" },
            { name: "Leave Status", path: "/A_leavestatus" },
            { name: "Logged Employees", path: "/Staffloggeed" }
          ].map((item) => (
            <button
              key={item.name}
              style={styles.navButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = styles.navButtonHover.background;
                e.currentTarget.style.color = styles.navButtonHover.color;
                e.currentTarget.style.borderColor = styles.navButtonHover.borderColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f8fafc';
                e.currentTarget.style.color = '#475569';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}
              onClick={() => navigate(item.path)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <div style={styles.mainContent}>
        
        {/* Welcome Pill */}
        <div style={styles.welcomeBox}>
          <img src="admin.jpg" alt="Admin" style={styles.profilePic} onError={(e) => e.target.src = 'https://via.placeholder.com/60'} />
          <div>
            <p style={styles.welcomeSub}>Administrator Panel</p>
            <h2 style={styles.welcomeText}>Welcome back, Admin</h2>
          </div>
        </div>

        {/* 2x2 Stats Grid */}
        <div style={styles.statsGrid}>
          <div style={styles.statBox}
               onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.1)'; }}
               onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.03)'; }}>
            <div style={styles.statTitle}>Total Employees</div>
            <div style={styles.statValue}>{dashboardData.totalEmployees}</div>
          </div>
          <div style={styles.statBox}
               onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.1)'; }}
               onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.03)'; }}>
            <div style={styles.statTitle}>Requested Leaves</div>
            <div style={styles.statValue}>{dashboardData.requestedLeaves}</div>
          </div>
          <div style={styles.statBox}
               onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.1)'; }}
               onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.03)'; }}>
            <div style={styles.statTitle}>Approved Leaves</div>
            <div style={styles.statValue}>{dashboardData.approvedLeaves}</div>
          </div>
          <div style={styles.statBox}
               onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.1)'; }}
               onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.03)'; }}>
            <div style={styles.statTitle}>Rejected Leaves</div>
            <div style={styles.statValue}>{dashboardData.rejectedLeaves}</div>
          </div>
        </div>
      </div>
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
    padding: '0 40px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  headerTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 0',
    borderBottom: '1px solid #f1f5f9',
  },
  mainHeading: {
    margin: 0,
    fontSize: '1.6rem',
    fontWeight: '800',
    background: 'linear-gradient(to right, #8b5cf6, #6d28d9)', // Admin Purple
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  backButton: {
    background: 'white',
    color: '#64748b',
    border: '1px solid #cbd5e1',
    padding: '8px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.2s',
  },
  navbar: {
    display: 'flex',
    gap: '12px',
    padding: '15px 0',
    overflowX: 'auto',
  },
  navButton: {
    background: '#f8fafc',
    color: '#475569',
    border: '1px solid #e2e8f0',
    padding: '10px 24px',
    borderRadius: '30px', // Pill shape
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.95rem',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s',
  },
  navButtonHover: {
    background: '#f3e8ff',
    color: '#7c3aed',
    borderColor: '#ddd6fe',
  },
  mainContent: {
    flex: 1,
    padding: '40px',
    maxWidth: '1000px',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  welcomeBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    background: 'white',
    padding: '20px 40px',
    borderRadius: '50px', 
    boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
    marginBottom: '50px',
    width: 'fit-content',
  },
  profilePic: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #f3e8ff',
  },
  welcomeSub: {
    margin: '0 0 4px 0',
    fontSize: '0.9rem',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: '600',
  },
  welcomeText: {
    margin: 0,
    fontSize: '1.4rem',
    fontWeight: '800',
    color: '#1e293b',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '30px',
    width: '100%',
  },
  statBox: {
    background: 'white',
    borderRadius: '24px',
    padding: '50px 30px',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    border: '1px solid #f8fafc',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'default',
  },
  statTitle: {
    fontSize: '1.2rem',
    color: '#64748b',
    fontWeight: '600',
    marginBottom: '20px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  statValue: {
    fontSize: '4.5rem',
    fontWeight: '800',
    color: '#7c3aed', // Purple accent
    margin: 0,
    lineHeight: '1',
  }
};

export default ADashboard;
