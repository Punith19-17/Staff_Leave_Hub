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
        
        // The backend doesn't send a 'success' property, so we check for data directly
        if (response.data) {
          setDashboardData({
            totalEmployees: response.data.totalEmployees || 0,
            requestedLeaves: response.data.requestedLeaves || 0,
            approvedLeaves: response.data.approvedLeaves || 0,
            rejectedLeaves: response.data.rejectedLeaves || 0
          });
        } else {
          console.error("Empty response from server");
          setDashboardData({
            totalEmployees: 0,
            requestedLeaves: 0,
            approvedLeaves: 0,
            rejectedLeaves: 0
          });
        }
      } catch (error) {
        console.error("Request failed:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
        setDashboardData({
          totalEmployees: 0,
          requestedLeaves: 0,
          approvedLeaves: 0,
          rejectedLeaves: 0
        });
      }
    };
  
    fetchDashboardData();
  }, []);

  return (
    <div style={styles.body}>
      {/* Header Section */}
      <header style={styles.header}>
        <h1 style={styles.mainHeading}>Staff Leave Hub</h1>
        <button 
          style={styles.backButton}
          onMouseEnter={(e) => e.currentTarget.style.background = styles.backButtonHover.background}
          onMouseLeave={(e) => e.currentTarget.style.background = styles.backButton.background}
          onClick={() => navigate("/A_Login")}
        >
          Back
        </button>
      </header>

      {/* Welcome Text */}
      <h2 style={styles.welcomeText}>Welcome to Admin Panel</h2>

      <div style={styles.container}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <img src="admin.jpg" alt="Profile" style={styles.profilePic} />
          <button
            style={styles.sidebarButton}
            onMouseEnter={(e) => e.currentTarget.style.background = styles.sidebarButtonHover.background}
            onMouseLeave={(e) => e.currentTarget.style.background = styles.sidebarButton.background}
            onClick={() => navigate("/EmployeeInfo")}
          >
            Employees
          </button>
          <button
            style={styles.sidebarButton}
            onMouseEnter={(e) => e.currentTarget.style.background = styles.sidebarButtonHover.background}
            onMouseLeave={(e) => e.currentTarget.style.background = styles.sidebarButton.background}
            onClick={() => navigate("/Attendance")}
          >
            Attendance
          </button>
          <button
            style={styles.sidebarButton}
            onMouseEnter={(e) => e.currentTarget.style.background = styles.sidebarButtonHover.background}
            onMouseLeave={(e) => e.currentTarget.style.background = styles.sidebarButton.background}
            onClick={() => navigate("/A_leaveapplications")}
          >
            Leave Details
          </button>
          <button
            style={styles.sidebarButton}
            onMouseEnter={(e) => e.currentTarget.style.background = styles.sidebarButtonHover.background}
            onMouseLeave={(e) => e.currentTarget.style.background = styles.sidebarButton.background}
            onClick={() => navigate("/A_holidays")}
          >
            Holidays
          </button>
          <button
            style={styles.sidebarButton}
            onMouseEnter={(e) => e.currentTarget.style.background = styles.sidebarButtonHover.background}
            onMouseLeave={(e) => e.currentTarget.style.background = styles.sidebarButton.background}
            onClick={() => navigate("/A_leavestatus")}
          >
            Leave Status
          </button>
          <button
            style={styles.sidebarButton}
            onMouseEnter={(e) => e.currentTarget.style.background = styles.sidebarButtonHover.background}
            onMouseLeave={(e) => e.currentTarget.style.background = styles.sidebarButton.background}
            onClick={() => navigate("/Staffloggeed")}
          >
            Logged Employees
          </button>
        </div>

        {/* Main Dashboard Content */}
        <div style={styles.mainContent}>
          {/* Info Boxes - First Row */}
          <div style={styles.boxRow}>
            <div 
              style={styles.box}
              onMouseEnter={(e) => e.currentTarget.style.transform = styles.boxHover.transform}
              onMouseLeave={(e) => e.currentTarget.style.transform = styles.box.transform}
            >
              <div style={styles.boxTitle}>Total Employees</div>
              <div style={styles.boxValue}>{dashboardData.totalEmployees}</div>
            </div>
            <div 
              style={styles.box}
              onMouseEnter={(e) => e.currentTarget.style.transform = styles.boxHover.transform}
              onMouseLeave={(e) => e.currentTarget.style.transform = styles.box.transform}
            >
              <div style={styles.boxTitle}>Requested Leaves</div>
              <div style={styles.boxValue}>{dashboardData.requestedLeaves}</div>
            </div>
          </div>
          {/* Info Boxes - Second Row */}
          <div style={styles.boxRow}>
            <div 
              style={styles.box}
              onMouseEnter={(e) => e.currentTarget.style.transform = styles.boxHover.transform}
              onMouseLeave={(e) => e.currentTarget.style.transform = styles.box.transform}
            >
              <div style={styles.boxTitle}>Approved Leaves</div>
              <div style={styles.boxValue}>{dashboardData.approvedLeaves}</div>
            </div>
            <div 
              style={styles.box}
              onMouseEnter={(e) => e.currentTarget.style.transform = styles.boxHover.transform}
              onMouseLeave={(e) => e.currentTarget.style.transform = styles.box.transform}
            >
              <div style={styles.boxTitle}>Rejected Leaves</div>
              <div style={styles.boxValue}>{dashboardData.rejectedLeaves}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// CSS Styles remain exactly the same as in your original code
const styles = {
  body: {
    background: "linear-gradient(135deg, #8e9eab, rgb(168, 178, 178))",
    minHeight: "100vh",
    padding: "20px",
    margin: 0,
  },
  header: {
    background: "linear-gradient(135deg, #E4EfE9, #93A5CF)",
    padding: "20px",
    textAlign: "center",
    borderRadius: "10px",
    marginBottom: "20px",
    position: "relative",
  },
  mainHeading: {
    fontSize: "30px",
    fontWeight: "bold",
    margin: "0",
  },
  welcomeText: {
    fontSize: "22px",
    fontWeight: "bold",
    marginLeft: "20px",
    marginBottom: "20px",
  },
  backButton: {
    position: "absolute",
    top: "15px",
    right: "20px",
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.3s ease",
  },
  backButtonHover: {
    background: "linear-gradient(135deg, #2575fc, #6a11cb)",
  },
  container: {
    display: "flex",
    gap: "30px",
    minHeight: "calc(60vh - 180px)",
  },
  sidebar: {
    background: "linear-gradient(135deg, #E4EfE9, #93A5CF)",
    padding: "25px",
    borderRadius: "10px",
    width: "300px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  profilePic: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    marginBottom: "20px",
    border: "3px solid white",
  },
  sidebarButton: {
    background: "linear-gradient(135deg, #E8F5C8, #9FA5D5)",
    border: "none",
    padding: "15px",
    borderRadius: "5px",
    margin: "8px 0",
    width: "100%",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "all 0.3s ease",
  },
  sidebarButtonHover: {
    background: "linear-gradient(135deg, #9FA5D5, #E8F5C8)",
  },
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  boxRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    marginBottom: "20px",
    width: "100%",
  },
  box: {
    background: "linear-gradient(135deg, #E8F5C8, #9FA5D5)",
    padding: "30px",
    borderRadius: "12px",
    textAlign: "center",
    fontWeight: "bold",
    width: "100%",
    height: "180px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  boxHover: {
    transform: "translateY(-5px) scale(1.02)",
    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
  },
  boxTitle: {
    fontSize: "22px",
    marginBottom: "15px",
    fontWeight: "600",
    transition: "all 0.3s ease",
  },
  boxValue: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#2c3e50",
    transition: "all 0.3s ease",
  },
};

export default ADashboard;