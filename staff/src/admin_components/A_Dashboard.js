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
        const response = await axios.get("https://staff-leave-hub.onrender.com/api/Adashboard");
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

  const stats = [
    { title: "Total Employees", value: dashboardData.totalEmployees, bg: "#F4F4FF", color: "#4F46E5", border: "#E0E7FF" },
    { title: "Requested Leaves", value: dashboardData.requestedLeaves, bg: "#FFFBEB", color: "#D97706", border: "#FEF3C7" },
    { title: "Approved Leaves", value: dashboardData.approvedLeaves, bg: "#ECFDF5", color: "#059669", border: "#D1FAE5" },
    { title: "Rejected Leaves", value: dashboardData.rejectedLeaves, bg: "#FEF2F2", color: "#DC2626", border: "#FEE2E2" }
  ];

  return (
    <div style={styles.container}>
      {/* Top Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.brand}>
          <div style={styles.logoIcon}>A</div>
          Staff Leave Hub
        </div>
        <button 
          style={styles.logoutBtn} 
          onClick={() => navigate("/A_Login")}
          onMouseOver={(e) => e.currentTarget.style.background = '#E5E7EB'}
          onMouseOut={(e) => e.currentTarget.style.background = '#F3F4F6'}
        >
          Logout
        </button>
      </nav>

      <div style={styles.layout}>
        {/* Left Side: Navigation Menu */}
        <aside style={styles.sidebar}>
          <div style={styles.sidebarTitle}>Admin Menu</div>
          {[
            { name: "Dashboard", path: "/A_Dashboard", active: true },
            { name: "Employees", path: "/EmployeeInfo" },
            { name: "Attendance", path: "/Attendance" },
            { name: "Leave Details", path: "/A_leaveapplications" },
            // { name: "Holidays", path: "/A_holidays" },
            { name: "Leave Status", path: "/A_leavestatus" },
            // { name: "Logged Employees", path: "/Staffloggeed" }
          ].map((item) => (
            <div 
              key={item.name}
              style={{
                ...styles.navItem,
                ...(item.active ? styles.navItemActive : {})
              }}
              onMouseOver={(e) => {
                if(!item.active) {
                  e.currentTarget.style.background = '#F3F4F6';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }
              }}
              onMouseOut={(e) => {
                if(!item.active) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.transform = 'none';
                }
              }}
              onClick={() => navigate(item.path)}
            >
              {item.name}
            </div>
          ))}
        </aside>

        {/* Right Side: Main Content */}
        <main style={styles.main}>
          <div style={styles.welcomeSection}>
            <h1 style={styles.greeting}>Administrator Overview</h1>
            <p style={styles.subtitle}>Welcome back. Here is what is happening today.</p>
          </div>

          <div style={styles.statsRow}>
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                style={{...styles.statCard, background: stat.bg, borderColor: stat.border}}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
              >
                <div style={styles.statTitle}>{stat.title}</div>
                <div style={{...styles.statValue, color: stat.color}}>{stat.value}</div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: '#F9FAFB', 
    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    padding: 0
  },
  navbar: {
    height: '70px',
    background: '#FFFFFF',
    borderBottom: '1px solid #E5E7EB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 40px',
    position: 'sticky',
    top: 0,
    zIndex: 10
  },
  brand: {
    fontSize: '20px',
    fontWeight: '800',
    color: '#111827',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  logoIcon: {
    background: '#4F46E5',
    color: 'white',
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  logoutBtn: {
    background: '#F3F4F6',
    color: '#4B5563',
    border: 'none',
    padding: '8px 24px',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: '14px'
  },
  layout: {
    display: 'flex',
    flex: 1
  },
  sidebar: {
    width: '260px',
    background: '#FFFFFF',
    borderRight: '1px solid #E5E7EB',
    padding: '30px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  sidebarTitle: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '15px',
    paddingLeft: '10px'
  },
  navItem: {
    padding: '12px 16px',
    borderRadius: '10px',
    color: '#4B5563',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: '14px'
  },
  navItemActive: {
    background: '#EEF2FF',
    color: '#4F46E5'
  },
  main: {
    flex: 1,
    padding: '50px 60px',
    overflowY: 'auto'
  },
  welcomeSection: {
    marginBottom: '40px'
  },
  greeting: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#111827',
    margin: '0 0 8px 0'
  },
  subtitle: {
    fontSize: '16px',
    color: '#6B7280',
    margin: 0
  },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '24px'
  },
  statCard: {
    padding: '35px 30px',
    borderRadius: '20px',
    border: '1px solid',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    transition: 'transform 0.3s ease',
    cursor: 'default'
  },
  statTitle: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#4B5563',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  statValue: {
    fontSize: '48px',
    fontWeight: '800',
    lineHeight: 1,
    margin: 0
  }
};

export default ADashboard;
