import React from "react";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/Home");
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
          ← Back to Home
        </button>
      </nav>

      {/* Main Content */}
      <div style={styles.main}>
        <div style={styles.badge}>About The Project</div>
        <h1 style={styles.title}>Meet the minds behind the platform.</h1>
        
        {/* Project Guide Section */}
        <div style={styles.guideCard}>
          <div style={styles.guideGlow}></div>
          <div style={styles.guideAvatar}>S</div>
          <h3 style={styles.guideName}>Seethalakshmi</h3>
          <p style={styles.guideRole}>Assistant Professor & Project Guide</p>
          <p style={styles.guideText}>
            This Staff Leave Hub platform was architected and developed as a comprehensive academic project by 3rd semester MCA students, under expert faculty guidance.
          </p>
        </div>

        {/* Team Members Section */}
        <h2 style={styles.teamTitle}>The Engineering Team</h2>
        <div style={styles.teamGrid}>
          
          {/* Punith A Card */}
          <div 
            style={styles.memberCard}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 15px 30px rgba(79, 70, 229, 0.08)';
              e.currentTarget.style.background = '#FFFFFF';
              e.currentTarget.style.borderColor = '#C7D2FE';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.background = '#F8FAFC';
              e.currentTarget.style.borderColor = '#F1F5F9';
            }}
          >
            <div style={{...styles.memberAvatar, background: '#EEF2FF', color: '#4F46E5', boxShadow: '0 5px 15px rgba(79,70,229,0.15)'}}>
              PA
            </div>
            <h3 style={styles.memberName}>Punith A</h3>
            <p style={styles.memberRole}>3rd Sem MCA Scholar</p>
          </div>

          {/* Pavithra H Card */}
          <div 
            style={styles.memberCard}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 15px 30px rgba(225, 29, 72, 0.08)';
              e.currentTarget.style.background = '#FFFFFF';
              e.currentTarget.style.borderColor = '#FECDD3';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.background = '#F8FAFC';
              e.currentTarget.style.borderColor = '#F1F5F9';
            }}
          >
            <div style={{...styles.memberAvatar, background: '#FFF1F2', color: '#E11D48', boxShadow: '0 5px 15px rgba(225,29,72,0.15)'}}>
              PH
            </div>
            <h3 style={styles.memberName}>Pavithra H</h3>
            <p style={styles.memberRole}>3rd Sem MCA Scholar</p>
          </div>

        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    height: '100vh',
    overflow: 'hidden', // Disables scrolling globally
    background: '#FFFFFF',
    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
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
    marginTop: '80px', 
    flex: 1,
    width: '100%',
    maxWidth: '850px',
    padding: '30px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', // Centers everything perfectly vertically
    textAlign: 'center',
    boxSizing: 'border-box'
  },
  badge: {
    background: '#F8FAFC',
    color: '#475569',
    padding: '6px 16px',
    borderRadius: '999px',
    fontSize: '0.8rem',
    fontWeight: '700',
    marginBottom: '15px',
    border: '1px solid #E2E8F0',
    letterSpacing: '1px',
    textTransform: 'uppercase'
  },
  title: {
    fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: '1.1',
    margin: '0 0 30px 0',
    letterSpacing: '-0.02em'
  },
  guideCard: {
    background: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: '20px',
    padding: '30px',
    width: '100%',
    boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
    marginBottom: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    boxSizing: 'border-box'
  },
  guideGlow: {
    position: 'absolute',
    top: 0, left: 0, right: 0, height: '6px',
    background: 'linear-gradient(90deg, #10B981, #34D399)'
  },
  guideAvatar: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: '#ECFDF5',
    color: '#059669',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: '800',
    marginBottom: '15px',
    border: '3px solid #FFFFFF',
    boxShadow: '0 8px 20px rgba(5, 150, 105, 0.15)'
  },
  guideName: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#0F172A',
    margin: '0 0 5px 0'
  },
  guideRole: {
    fontSize: '1rem',
    color: '#059669',
    fontWeight: '700',
    margin: '0 0 10px 0'
  },
  guideText: {
    fontSize: '0.95rem',
    color: '#475569',
    lineHeight: '1.5',
    margin: 0,
    maxWidth: '600px'
  },
  teamTitle: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: '20px'
  },
  teamGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    width: '100%'
  },
  memberCard: {
    background: '#F8FAFC',
    borderRadius: '20px',
    padding: '25px 20px',
    border: '2px solid #F1F5F9',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'default'
  },
  memberAvatar: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
    fontWeight: '800',
    marginBottom: '15px',
    border: '3px solid #FFFFFF'
  },
  memberName: {
    fontSize: '1.3rem',
    fontWeight: '800',
    color: '#0F172A',
    margin: '0 0 5px 0'
  },
  memberRole: {
    fontSize: '0.9rem',
    color: '#64748B',
    fontWeight: '600',
    margin: 0
  }
};

export default AboutUs;
