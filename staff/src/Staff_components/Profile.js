import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StaffLeaveHub = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://staffleavehub-production.up.railway.app/api/profile', {
          credentials: 'include',
        });
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
  ? `https://staffleavehub-production.up.railway.app/${userData.profile_picture}`
  : 'https://via.placeholder.com/150';

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Staff Leave Hub</h1>
        <button style={styles.backButton} onClick={() => navigate(-1)}>← Back</button>
      </header>

      <div style={styles.container}>
        <div style={styles.card}>
          {/* Left Panel: Photo & Quick Info */}
          <div style={styles.leftPanel}>
            <img
              src={profileImageUrl}
              alt="Profile"
              style={styles.profileImage}
              onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
            />
            <div style={styles.roleBadge}>{userData.designation || 'Employee'}</div>
            <h2 style={styles.profileName}>{userData.name}</h2>
            <p style={styles.profileId}>ID: {userData.employee_id}</p>
          </div>

          {/* Right Panel: Detailed Grid */}
          <div style={styles.detailsGrid}>
            <div style={styles.dataGroup}>
              <div style={styles.dataLabel}>Employee Type</div>
              <div style={styles.dataValue}>{userData.employee_type || 'Teaching'}</div>
            </div>
            <div style={styles.dataGroup}>
              <div style={styles.dataLabel}>Department</div>
              <div style={styles.dataValue}>{userData.department}</div>
            </div>
            <div style={styles.dataGroup}>
              <div style={styles.dataLabel}>Email ID</div>
              <div style={styles.dataValue}>{userData.email_id}</div>
            </div>
            <div style={styles.dataGroup}>
              <div style={styles.dataLabel}>Contact No.</div>
              <div style={styles.dataValue}>{userData.mobile_no || 'N/A'}</div>
            </div>
            <div style={styles.dataGroup}>
              <div style={styles.dataLabel}>Gender</div>
              <div style={styles.dataValue}>{userData.gender}</div>
            </div>
            <div style={styles.dataGroup}>
              <div style={styles.dataLabel}>Date of Birth</div>
              <div style={styles.dataValue}>{formattedDOB}</div>
            </div>
            <div style={styles.dataGroup}>
              <div style={styles.dataLabel}>Aadhar Number</div>
              <div style={styles.dataValue}>{userData.adhar_number}</div>
            </div>
            <div style={styles.dataGroup}>
              <div style={styles.dataLabel}>Address</div>
              <div style={styles.dataValue}>{userData.permanent_address}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    margin: 0,
    padding: 0,
    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: '#f0f4f8',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  loading: {
    height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
    fontFamily: "'Inter', sans-serif", fontSize: '1.2rem', color: '#64748b'
  },
  header: {
    background: 'white',
    padding: '15px 40px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: '800',
    background: 'linear-gradient(to right, #3b82f6, #2563eb)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  backButton: {
    padding: '8px 16px',
    fontSize: '0.95rem',
    cursor: 'pointer',
    border: '1px solid #cbd5e1',
    backgroundColor: 'white',
    color: '#475569',
    borderRadius: '8px',
    fontWeight: '600',
  },
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '50px 20px',
  },
  card: {
    background: 'white',
    borderRadius: '24px',
    padding: '50px',
    boxShadow: '0 15px 40px rgba(0,0,0,0.06)',
    display: 'flex',
    flexDirection: 'row',
    gap: '60px',
    maxWidth: '1000px',
    width: '100%',
    boxSizing: 'border-box',
    flexWrap: 'wrap',
  },
  leftPanel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '250px',
    borderRight: '1px solid #f1f5f9',
    paddingRight: '60px',
  },
  profileImage: {
    width: '160px',
    height: '160px',
    objectFit: 'cover',
    borderRadius: '50%',
    border: '5px solid #eff6ff',
    boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
    marginBottom: '20px',
  },
  roleBadge: {
    background: '#eff6ff',
    color: '#2563eb',
    padding: '6px 16px',
    borderRadius: '20px',
    fontWeight: '700',
    fontSize: '0.85rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '15px',
  },
  profileName: {
    margin: '0 0 5px 0',
    fontSize: '1.6rem',
    fontWeight: '800',
    color: '#1e293b',
    textAlign: 'center',
  },
  profileId: {
    margin: 0,
    fontSize: '1rem',
    color: '#64748b',
    fontWeight: '500',
  },
  detailsGrid: {
    flex: 1,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '30px',
    alignContent: 'center',
  },
  dataGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  dataLabel: {
    fontSize: '0.85rem',
    textTransform: 'uppercase',
    color: '#94a3b8',
    fontWeight: '700',
    letterSpacing: '0.5px',
  },
  dataValue: {
    fontSize: '1.1rem',
    color: '#334155',
    fontWeight: '600',
    lineHeight: '1.4',
  }
};

export default StaffLeaveHub;
