import React, { useState } from 'react';

const StaffLeaveHub = () => {
  const [activeTab, setActiveTab] = useState("/");

  const handleNavClick = (e, path) => {
    e.preventDefault();
    setActiveTab(path);
    window.location.href = path; // Fallback to normal navigation
  };

  return (
    <div style={styles.page}>
      {/* Header & Navbar */}
      <header style={styles.headerBar}>
        <div style={styles.headerTitle}>Staff Leave Hub</div>
        <nav style={styles.navbar}>
          <a 
            href="/" 
            style={activeTab === "/" ? {...styles.navLink, ...styles.navLinkActive} : styles.navLink}
            onClick={(e) => handleNavClick(e, "/")}
          >Home</a>
          <a 
            href="/Login" 
            style={activeTab === "/Login" ? {...styles.navLink, ...styles.navLinkActive} : styles.navLink}
            onClick={(e) => handleNavClick(e, "/Login")}
          >Staff Login</a>
          <a 
            href="/A_Login" 
            style={activeTab === "/A_Login" ? {...styles.navLink, ...styles.navLinkActive} : styles.navLink}
            onClick={(e) => handleNavClick(e, "/A_Login")}
          >Admin Login</a>
          <a 
            href="/Aboutus" 
            style={activeTab === "/Aboutus" ? {...styles.navLink, ...styles.navLinkActive} : styles.navLink}
            onClick={(e) => handleNavClick(e, "/Aboutus")}
          >About Us</a>
        </nav>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Section 1 */}
        <section style={styles.section}>
          <div style={styles.imageContainer}>
            <img src="leave1.png" alt="Leave Management" style={styles.image} />
          </div>
          <div style={styles.contentInfo}>
            <h2 style={styles.sectionTitle}>Employee Applying Leave</h2>
            <p style={styles.sectionText}>Streamline your leave management process with our intuitive system:</p>
            <ul style={styles.list}>
              <li style={styles.listItem}><span style={styles.checkIcon}>✓</span> Login to the system using employee credentials.</li>
              <li style={styles.listItem}><span style={styles.checkIcon}>✓</span> Go to the 'Leave Application' section in the dashboard.</li>
              <li style={styles.listItem}><span style={styles.checkIcon}>✓</span> Select the leave start date and end date.</li>
              <li style={styles.listItem}><span style={styles.checkIcon}>✓</span> Enter the reason for taking leave. (Optional) Upload a document if required</li>
            </ul>
          </div>
        </section>

        {/* Section 2 - Reverse */}
        <section style={{...styles.section, ...styles.sectionReverse}}>
          <div style={styles.imageContainer}>
            <img src="leave2.jpg" alt="Team Collaboration" style={styles.image} />
          </div>
          <div style={styles.contentInfo}>
            <h2 style={styles.sectionTitle}>Employee Attendance</h2>
            <p style={styles.sectionText}>Features designed to enhance employee attendance:</p>
            <ul style={styles.list}>
              <li style={styles.listItem}><span style={styles.checkIcon}>✓</span> Shared team calendars</li>
              <li style={styles.listItem}><span style={styles.checkIcon}>✓</span> Customizable notifications</li>
              <li style={styles.listItem}><span style={styles.checkIcon}>✓</span> Availability indicators</li>
              <li style={styles.listItem}><span style={styles.checkIcon}>✓</span> Shift coverage tools</li>
            </ul>
          </div>
        </section>

        {/* Section 3 */}
        <section style={styles.section}>
          <div style={styles.imageContainer}>
            <img src="leave3.jpg" alt="Analytics Dashboard" style={styles.image} />
          </div>
          <div style={styles.contentInfo}>
            <h2 style={styles.sectionTitle}>Advanced Analytics</h2>
            <p style={styles.sectionText}>Data-driven insights for better decision making:</p>
            <ul style={styles.list}>
              <li style={styles.listItem}><span style={styles.checkIcon}>✓</span> Leave trend analysis</li>
              <li style={styles.listItem}><span style={styles.checkIcon}>✓</span> Custom reporting</li>
              <li style={styles.listItem}><span style={styles.checkIcon}>✓</span> Staffing forecasts</li>
              <li style={styles.listItem}><span style={styles.checkIcon}>✓</span> Peak period identification</li>
            </ul>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>&copy; 2025 Staff Leave Hub. All rights reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  page: {
    margin: 0,
    padding: 0,
    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%)",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  headerBar: {
    width: "100%",
    background: "white",
    padding: "15px 40px",
    position: "sticky",
    top: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    boxSizing: "border-box",
    zIndex: 1000,
  },
  headerTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    background: "linear-gradient(to right, #3b82f6, #2563eb)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  navbar: {
    display: "flex",
    gap: "20px",
  },
  navLink: {
    textDecoration: "none",
    color: "#64748b",
    fontWeight: "600",
    fontSize: "1rem",
    padding: "8px 12px",
    borderRadius: "8px",
    transition: "all 0.2s ease",
  },
  navLinkActive: {
    color: "#2563eb",
    backgroundColor: "#eff6ff",
  },
  main: {
    flex: 1,
    padding: "40px 20px",
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "60px",
  },
  section: {
    display: "flex",
    alignItems: "center",
    gap: "40px",
    background: "white",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
  },
  sectionReverse: {
    flexDirection: "row-reverse",
  },
  imageContainer: {
    flex: "1",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    display: "flex",
  },
  image: {
    width: "100%",
    height: "auto",
    objectFit: "cover",
  },
  contentInfo: {
    flex: "1",
    padding: "20px",
  },
  sectionTitle: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "16px",
    marginTop: 0,
  },
  sectionText: {
    fontSize: "1.1rem",
    color: "#475569",
    marginBottom: "20px",
    lineHeight: "1.6",
  },
  list: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    fontSize: "1.05rem",
    color: "#334155",
    marginBottom: "12px",
    lineHeight: "1.5",
    display: "flex",
    alignItems: "flex-start",
  },
  checkIcon: {
    color: "#2563eb",
    fontWeight: "bold",
    marginRight: "10px",
  },
  footer: {
    background: "white",
    padding: "24px",
    textAlign: "center",
    borderTop: "1px solid #e2e8f0",
  },
  footerText: {
    margin: 0,
    color: "#64748b",
    fontWeight: "500",
  }
};

export default StaffLeaveHub;
