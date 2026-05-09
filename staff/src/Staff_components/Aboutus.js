import React from "react";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/Home");
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerTitle}>Staff Leave Hub</div>
        <button 
          style={styles.backButton}
          onMouseOver={(e) => Object.assign(e.target.style, styles.backButtonHover)}
          onMouseOut={(e) => Object.assign(e.target.style, styles.backButton)}
          onClick={handleBackClick}
        >
          ← Back to Home
        </button>
      </header>

      {/* Main Content */}
      <div style={styles.content}>
        {/* About Us Section */}
        <h2 style={{ ...styles.title, marginTop: "0px" }}>About Us</h2>
        <p style={{ ...styles.text, marginTop: "20px" }}>
          This project is developed by 3rd sem MCA students under the guidance
          of
          <span style={styles.bold}> Seethalakshmi</span>, Assistant Professor.
        </p>

        {/* Team Members Section */}
        <h2 style={{ ...styles.title, marginTop: "40px" }}>
          OUR TEAM MEMBERS ARE
        </h2>
        <div style={styles.teamContainer}>
          <div style={styles.teamMemberCard}>
            <p style={styles.teamMember}>Punith A</p>
          </div>
          <div style={styles.teamMemberCard}>
            <p style={styles.teamMember}>Pavithra H</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%)",
    paddingTop: "80px",
  },
  header: {
    width: "100%",
    background: "white",
    padding: "15px 40px",
    position: "fixed",
    top: 0,
    left: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1000,
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    boxSizing: "border-box",
  },
  headerTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#1e293b",
    background: "linear-gradient(to right, #3b82f6, #2563eb)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  backButton: {
    padding: "8px 16px",
    fontSize: "0.95rem",
    cursor: "pointer",
    border: "1px solid #cbd5e1",
    backgroundColor: "white",
    color: "#475569",
    borderRadius: "8px",
    transition: "all 0.2s ease",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  backButtonHover: {
    backgroundColor: "#f8fafc",
    color: "#1e293b",
    borderColor: "#94a3b8",
  },
  content: {
    width: "90%",
    maxWidth: "800px",
    padding: "50px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
    background: "white",
    marginTop: "40px",
    textAlign: "center",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "700",
    marginBottom: "15px",
    color: "#1e293b",
  },
  text: {
    fontSize: "1.1rem",
    lineHeight: "1.6",
    color: "#475569",
  },
  bold: {
    fontWeight: "700",
    color: "#2563eb",
  },
  teamContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px",
  },
  teamMemberCard: {
    padding: "15px 30px",
    background: "#f8fafc",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
  },
  teamMember: {
    fontSize: "1.2rem",
    fontWeight: "600",
    color: "#334155",
    margin: 0,
  },
};

export default AboutUs;
