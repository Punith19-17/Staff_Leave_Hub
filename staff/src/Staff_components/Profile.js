import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useIsMobile from './useIsMobile';

const StaffLeaveHub = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://staff-leave-hub.onrender.com/api/profile', { credentials: 'include' });
        if (response.status === 401) { navigate('/login'); return; }
        if (!response.ok) { navigate('/login'); return; }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [navigate]);

  if (loading) return <div style={styles.loading}>Loading profile...</div>;
  if (!userData) return <div style={styles.loading}>Failed to load user data</div>;

  const formattedDOB = userData.dob ? new Date(userData.dob).toDateString() : '';
  const profileImageUrl = userData.profile_picture
    ? `https://staff-leave-hub.onrender.com/${userData.profile_picture}`
    : 'https://via.placeholder.com/150';

  return (
    <div style={styles.page}>

      {/* Header — Back button LEFT, title CENTERED */}
      <header style={{ ...styles.header, padding: isMobile ? '14px 16px' : '15px 40px', position: 'relative', flexDirection: 'row' }}>
        <button style={styles.backButton} onClick={() => navigate(-1)}>← Back</button>
        <h1 style={{
          ...styles.headerTitle,
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: isMobile ? '1.1rem' : '1.5rem',
          whiteSpace: 'nowrap'
        }}>
          Staff Leave Hub
        </h1>
        {/* Invisible spacer keeps title truly centered */}
        <div style={{ visibility: 'hidden', padding: '8px 16px', fontSize: '0.95rem', whiteSpace: 'nowrap' }}>← Back</div>
      </header>

      <div style={{ ...styles.container, padding: isMobile ? '20px 16px' : '50px 20px' }}>
        <div style={{
          ...styles.card,
          flexDirection: isMobile ? 'column' : 'row',
          padding: isMobile ? '24px 20px' : '50px',
          gap: isMobile ? '24px' : '60px'
        }}>

          {/* Left Panel */}
          <div style={{
            ...styles.leftPanel,
            minWidth: isMobile ? 'unset' : '250px',
            borderRight: isMobile ? 'none' : '1px solid #f1f5f9',
            borderBottom: isMobile ? '1px solid #f1f5f9' : 'none',
            paddingRight: isMobile ? '0' : '60px',
            paddingBottom: isMobile ? '24px' : '0',
            width: isMobile ? '100%' : 'auto'
          }}>
            <img
              src={profileImageUrl}
              alt="Profile"
              style={{ ...styles.profileImage, width: isMobile ? '120px' : '160px', height: isMobile ? '120px' : '160px' }}
              onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
            />
            <div style={styles.roleBadge}>{userData.designation || 'Employee'}</div>
            <h2 style={{ ...styles.profileName, fontSize: isMobile ? '1.3rem' : '1.6rem' }}>{userData.name}</h2>
            <p style={styles.profileId}>ID: {userData.employee_id}</p>
          </div>

          {/* Right Panel: Details Grid */}
          <div style={{
            ...styles.detailsGrid,
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: isMobile ? '20px' : '30px'
          }}>
            {[
              { label: 'Employee Type', value: userData.employee_type || 'Teaching' },
              { label: 'Department', value: userData.department },
              { label: 'Email ID', value: userData.email_id },
              { label: 'Contact No.', value: userData.mobile_no || 'N/A' },
              { label: 'Gender', value: userData.gender },
              { label: 'Date of Birth', value: formattedDOB },
              { label: 'Aadhar Number', value: userData.adhar_number },
              { label: 'Address', value: userData.permanent_address },
            ].map((item) => (
              <div key={item.label} style={styles.dataGroup}>
                <div style={styles.dataLabel}>{item.label}</div>
                <div style={{ ...styles.dataValue, fontSize: isMobile ? '0.95rem' : '1.1rem', wordBreak: 'break-word' }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: { margin: 0, padding: 0, fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", background: '#f0f4f8', minHeight: '100vh', display: 'flex', flexDirection: 'column' },
  loading: { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: "'Inter', sans-serif", fontSize: '1.2rem', color: '#64748b' },
  header: { background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { margin: 0, fontWeight: '800', background: 'linear-gradient(to right, #3b82f6, #2563eb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  backButton: { padding: '8px 16px', fontSize: '0.95rem', cursor: 'pointer', border: '1px solid #cbd5e1', backgroundColor: 'white', color: '#475569', borderRadius: '8px', fontWeight: '600', flexShrink: 0, whiteSpace: 'nowrap' },
  container: { flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' },
  card: { background: 'white', borderRadius: '24px', boxShadow: '0 15px 40px rgba(0,0,0,0.06)', display: 'flex', maxWidth: '1000px', width: '100%', boxSizing: 'border-box', flexWrap: 'wrap' },
  leftPanel: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  profileImage: { objectFit: 'cover', borderRadius: '50%', border: '5px solid #eff6ff', boxShadow: '0 8px 20px rgba(0,0,0,0.08)', marginBottom: '20px' },
  roleBadge: { background: '#eff6ff', color: '#2563eb', padding: '6px 16px', borderRadius: '20px', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '15px' },
  profileName: { margin: '0 0 5px 0', fontWeight: '800', color: '#1e293b', textAlign: 'center' },
  profileId: { margin: 0, fontSize: '1rem', color: '#64748b', fontWeight: '500' },
  detailsGrid: { flex: 1, display: 'grid', alignContent: 'center' },
  dataGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  dataLabel: { fontSize: '0.8rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: '700', letterSpacing: '0.5px' },
  dataValue: { color: '#334155', fontWeight: '600', lineHeight: '1.4' }
};

export default StaffLeaveHub;
