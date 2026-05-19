import React, { useState } from 'react';
import useIsMobile from './useIsMobile';

const StaffLeaveHub = () => {
  const [activeTab, setActiveTab] = useState("/");
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleNavClick = (e, path) => {
    e.preventDefault();
    setActiveTab(path);
    setMenuOpen(false);
    window.location.href = path;
  };

  return (
    <div style={styles.page}>

      {/* Floating Glass Navbar */}
      <nav style={{ ...styles.navbar, height: isMobile ? 'auto' : '80px' }}>
        <div style={isMobile ? styles.navContainerMobile : styles.navContainer}>

          {/* Brand */}
          <div style={styles.brand} onClick={(e) => handleNavClick(e, "/")}>
            <div style={styles.logoMark}></div>
            Staff Leave Hub
          </div>

          {/* Desktop nav links */}
          {!isMobile && (
            <div style={styles.navLinks}>
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/Aboutus' }
              ].map(link => (
                <a
                  key={link.name}
                  href={link.path}
                  style={activeTab === link.path ? { ...styles.navLink, color: '#4F46E5' } : styles.navLink}
                  onMouseOver={(e) => e.currentTarget.style.color = '#4F46E5'}
                  onMouseOut={(e) => e.currentTarget.style.color = activeTab === link.path ? '#4F46E5' : '#475569'}
                  onClick={(e) => handleNavClick(e, link.path)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          )}

          {/* Desktop action buttons */}
          {!isMobile && (
            <div style={styles.navActions}>
              <button
                style={styles.secondaryBtn}
                onMouseOver={(e) => e.currentTarget.style.background = '#E2E8F0'}
                onMouseOut={(e) => e.currentTarget.style.background = '#F1F5F9'}
                onClick={(e) => handleNavClick(e, "/A_Login")}
              >
                Admin Portal
              </button>
              <button
                style={styles.primaryBtn}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
                onClick={(e) => handleNavClick(e, "/Login")}
              >
                Staff Login
              </button>
            </div>
          )}

          {/* Mobile: hamburger toggle */}
          {isMobile && (
            <button
              style={styles.hamburger}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          )}
        </div>

        {/* Mobile dropdown menu */}
        {isMobile && menuOpen && (
          <div style={styles.mobileMenu}>
            <a href="/" style={styles.mobileMenuLink} onClick={(e) => handleNavClick(e, "/")}>Home</a>
            <a href="/Aboutus" style={styles.mobileMenuLink} onClick={(e) => handleNavClick(e, "/Aboutus")}>About Us</a>
            <div style={styles.mobileMenuDivider} />
            <button style={styles.mobileMenuBtn} onClick={(e) => handleNavClick(e, "/A_Login")}>Admin Portal</button>
            <button style={{ ...styles.mobileMenuBtn, ...styles.mobileMenuBtnPrimary }} onClick={(e) => handleNavClick(e, "/Login")}>Staff Login</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section style={{ ...styles.hero, padding: isMobile ? '140px 20px 80px 20px' : '200px 20px 140px 20px' }}>
        <div style={styles.heroGlow}></div>
        <div style={styles.heroContent}>
          <div style={styles.badge}>✨ Introducing Staff Leave Hub 2.0</div>
          <h1 style={{ ...styles.heroTitle, fontSize: isMobile ? '2.2rem' : 'clamp(3rem, 6vw, 4.8rem)' }}>
            Modernize Your Workforce <br />
            <span style={styles.textGradient}>Leave Management.</span>
          </h1>
          <p style={{ ...styles.heroSubtitle, fontSize: isMobile ? '1rem' : 'clamp(1.1rem, 2vw, 1.3rem)' }}>
            The ultimate platform for employees to request time off and administrators to track attendance seamlessly. Experience the future of HR workflows today.
          </p>
          <div style={styles.heroButtons}>
            <button
              style={{ ...styles.heroBtnPrimary, width: isMobile ? '100%' : 'auto' }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 15px 30px rgba(79,70,229,0.4)'; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(79,70,229,0.3)'; }}
              onClick={(e) => handleNavClick(e, "/Login")}
            >
              Get Started Now
            </button>
            <button
              style={{ ...styles.heroBtnSecondary, width: isMobile ? '100%' : 'auto' }}
              onMouseOver={(e) => e.currentTarget.style.background = '#F8FAFC'}
              onMouseOut={(e) => e.currentTarget.style.background = '#FFFFFF'}
              onClick={(e) => handleNavClick(e, "/Aboutus")}
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ ...styles.featuresSection, padding: isMobile ? '60px 16px' : '100px 24px' }}>
        <div style={styles.featuresHeader}>
          <h2 style={{ ...styles.featuresTitle, fontSize: isMobile ? '1.6rem' : 'clamp(2rem, 4vw, 2.8rem)' }}>
            Everything you need to manage your team
          </h2>
          <p style={styles.featuresSubtitle}>Powerful, intuitive features designed for both staff and administrators.</p>
        </div>

        <div style={{ ...styles.grid, gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          {[
            { img: 'leave1.png', alt: 'Leave Applications', title: 'Effortless Applications', desc: 'Apply for leave in seconds. Select dates, provide a reason, and track your approval status directly from your dashboard.' },
            { img: 'leave2.jpg', alt: 'Team Attendance', title: 'Smart Attendance', desc: 'Monitor daily attendance, track team availability in real-time, and ensure complete shift coverage without the hassle.' },
            { img: 'leave3.jpg', alt: 'Analytics Dashboard', title: 'Advanced Analytics', desc: 'Leverage data-driven insights to analyze leave trends, forecast staffing needs, and identify peak holiday periods easily.' }
          ].map((card) => (
            <div
              key={card.title}
              style={styles.featureCard}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = '#C7D2FE'; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.02)'; e.currentTarget.style.borderColor = '#E2E8F0'; }}
            >
              <div style={styles.cardImageWrapper}>
                <img src={card.img} alt={card.alt} style={styles.cardImage} />
              </div>
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>{card.title}</h3>
                <p style={styles.cardDesc}>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerBrand}>
          <div style={{ ...styles.logoMark, width: '24px', height: '24px' }}></div>
          Staff Leave Hub
        </div>
        <p style={styles.footerText}>&copy; 2025 Staff Leave Hub. All rights reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  page: { margin: 0, padding: 0, fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", background: "#FFFFFF", minHeight: "100vh", overflowX: 'hidden' },
  navbar: { position: 'fixed', top: 0, left: 0, right: 0, background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,0,0,0.05)', zIndex: 1000 },
  navContainer: { maxWidth: '1200px', width: '100%', padding: '0 24px', margin: '0 auto', height: '80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  navContainerMobile: { width: '100%', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  brand: { fontSize: '1.25rem', fontWeight: '800', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', whiteSpace: 'nowrap' },
  logoMark: { width: '32px', height: '32px', background: 'linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%)', borderRadius: '8px', flexShrink: 0 },
  navLinks: { display: 'flex', gap: '32px' },
  navLink: { textDecoration: 'none', color: '#475569', fontWeight: '600', fontSize: '0.95rem', transition: 'color 0.2s' },
  navActions: { display: 'flex', gap: '12px' },
  primaryBtn: { background: '#0F172A', color: '#FFFFFF', border: 'none', padding: '10px 24px', borderRadius: '999px', fontWeight: '600', cursor: 'pointer', transition: 'transform 0.2s ease' },
  secondaryBtn: { background: '#F1F5F9', color: '#0F172A', border: '1px solid #E2E8F0', padding: '10px 24px', borderRadius: '999px', fontWeight: '600', cursor: 'pointer' },
  hamburger: { background: 'none', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '8px 12px', fontSize: '1.2rem', cursor: 'pointer', color: '#0F172A', lineHeight: 1 },
  mobileMenu: { borderTop: '1px solid #E2E8F0', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '10px', background: 'white' },
  mobileMenuLink: { textDecoration: 'none', color: '#475569', fontWeight: '600', fontSize: '1rem', padding: '10px 0', borderBottom: '1px solid #F1F5F9' },
  mobileMenuDivider: { height: '1px', background: '#E2E8F0', margin: '4px 0' },
  mobileMenuBtn: { background: '#F1F5F9', color: '#0F172A', border: '1px solid #E2E8F0', padding: '12px 20px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer', fontSize: '1rem', textAlign: 'left' },
  mobileMenuBtnPrimary: { background: '#0F172A', color: '#FFFFFF', border: 'none' },
  hero: { position: 'relative', display: 'flex', justifyContent: 'center', textAlign: 'center', overflow: 'hidden', background: '#F8FAFC' },
  heroGlow: { position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)', width: '1000px', height: '1000px', background: 'radial-gradient(circle, rgba(79,70,229,0.12) 0%, rgba(6,182,212,0.05) 40%, rgba(255,255,255,0) 70%)', zIndex: 0, pointerEvents: 'none' },
  heroContent: { position: 'relative', zIndex: 1, maxWidth: '900px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' },
  badge: { background: '#EEF2FF', color: '#4F46E5', padding: '8px 20px', borderRadius: '999px', fontSize: '0.875rem', fontWeight: '700', marginBottom: '30px', border: '1px solid #E0E7FF', boxShadow: '0 4px 10px rgba(79,70,229,0.1)' },
  heroTitle: { fontWeight: '800', color: '#0F172A', lineHeight: '1.15', margin: '0 0 24px 0', letterSpacing: '-0.03em' },
  textGradient: { background: 'linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  heroSubtitle: { color: '#475569', maxWidth: '650px', lineHeight: '1.6', margin: '0 0 45px 0' },
  heroButtons: { display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', width: '100%' },
  heroBtnPrimary: { background: 'linear-gradient(135deg, #4F46E5 0%, #3B82F6 100%)', color: '#FFFFFF', border: 'none', padding: '16px 36px', borderRadius: '999px', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer', boxShadow: '0 10px 25px rgba(79,70,229,0.3)', transition: 'transform 0.2s ease, box-shadow 0.2s ease' },
  heroBtnSecondary: { background: '#FFFFFF', color: '#0F172A', border: '1px solid #E2E8F0', padding: '16px 36px', borderRadius: '999px', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', transition: 'background 0.2s ease' },
  featuresSection: { maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' },
  featuresHeader: { textAlign: 'center', marginBottom: '50px', maxWidth: '600px' },
  featuresTitle: { fontWeight: '800', color: '#0F172A', margin: '0 0 16px 0', letterSpacing: '-0.02em', lineHeight: '1.2' },
  featuresSubtitle: { fontSize: '1.05rem', color: '#64748B', lineHeight: '1.6', margin: 0 },
  grid: { display: 'grid', gap: '28px', width: '100%' },
  featureCard: { background: '#FFFFFF', borderRadius: '24px', padding: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', transition: 'all 0.3s ease', display: 'flex', flexDirection: 'column' },
  cardImageWrapper: { width: '100%', height: '220px', borderRadius: '16px', overflow: 'hidden', background: '#F8FAFC', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  cardImage: { width: '100%', height: '100%', objectFit: 'cover' },
  cardContent: { padding: '0 12px 12px 12px' },
  cardTitle: { fontSize: '1.3rem', fontWeight: '800', color: '#0F172A', margin: '0 0 10px 0' },
  cardDesc: { fontSize: '1rem', color: '#64748B', lineHeight: '1.6', margin: 0 },
  footer: { borderTop: '1px solid #E2E8F0', padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', background: '#F8FAFC' },
  footerBrand: { fontSize: '1.1rem', fontWeight: '800', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' },
  footerText: { color: '#64748B', fontWeight: '500', margin: 0, fontSize: '0.95rem' }
};

export default StaffLeaveHub;
