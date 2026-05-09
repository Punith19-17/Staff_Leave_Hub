import React from "react";
import { useNavigate } from "react-router-dom";

function EmployeeInfo() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* Top Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.brand}>
          <div style={styles.logoIcon}>A</div>
          Staff Leave Hub
        </div>
        <button style={styles.backBtn} onClick={() => navigate("/A_Dashboard")}>
          Back to Dashboard
        </button>
      </nav>

      <main style={styles.main}>
        <div style={styles.header}>
          <h1 style={styles.title}>Employee Directory</h1>
          <p style={styles.subtitle}>Select a category to view personnel information.</p>
        </div>

        <div style={styles.grid}>
          {/* Teaching Card */}
          <div 
            style={styles.card}
            onClick={() => navigate("/A_personalinfo")}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(79, 70, 229, 0.1)';
              e.currentTarget.style.borderColor = '#4F46E5';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = '#E5E7EB';
            }}
          >
            <div style={{...styles.iconWrapper, background: '#EEF2FF', color: '#4F46E5'}}>
              👨‍🏫
            </div>
            <h2 style={styles.cardTitle}>Teaching Staff</h2>
            <p style={styles.cardDesc}>Manage professors, lecturers, and academic instructors.</p>
          </div>

          {/* Non-Teaching Card */}
          <div 
            style={styles.card}
            onClick={() => navigate("/A_personalinfo")}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(16, 185, 129, 0.1)';
              e.currentTarget.style.borderColor = '#10B981';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = '#E5E7EB';
            }}
          >
            <div style={{...styles.iconWrapper, background: '#ECFDF5', color: '#10B981'}}>
              👨‍💼
            </div>
            <h2 style={styles.cardTitle}>Non-Teaching Staff</h2>
            <p style={styles.cardDesc}>Manage administration, support, and technical personnel.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#F9FAFB',
    fontFamily: "'Inter', 'Segoe UI', sans-serif"
  },
  navbar: {
    height: '70px',
    background: '#FFFFFF',
    borderBottom: '1px solid #E5E7EB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 40px'
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
  backBtn: {
    background: '#FFFFFF',
    color: '#4B5563',
    border: '1px solid #D1D5DB',
    padding: '8px 20px',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: '0.2s ease'
  },
  main: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '80px 40px'
  },
  header: {
    textAlign: 'center',
    marginBottom: '60px'
  },
  title: {
    fontSize: '36px',
    fontWeight: '800',
    color: '#111827',
    margin: '0 0 15px 0'
  },
  subtitle: {
    fontSize: '18px',
    color: '#6B7280',
    margin: 0
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '40px'
  },
  card: {
    background: '#FFFFFF',
    border: '2px solid #E5E7EB',
    borderRadius: '24px',
    padding: '50px 40px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  iconWrapper: {
    width: '90px',
    height: '90px',
    borderRadius: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '40px',
    margin: '0 auto 30px auto'
  },
  cardTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '15px',
    margin: 0
  },
  cardDesc: {
    fontSize: '15px',
    color: '#6B7280',
    lineHeight: '1.6',
    margin: 0
  }
};

export default EmployeeInfo;
