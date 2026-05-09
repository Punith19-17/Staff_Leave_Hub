import React, { useState } from "react";

const LeaveRequest = () => {
  const [formData, setFormData] = useState({
    employee_id: "", name: "", department: "", designation: "",
    leave_type: "", start_date: "", end_date: "", leave_letter: null, reason: ""
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (const key in formData) { formDataToSend.append(key, formData[key]); }

      const response = await fetch('https://staff-leave-hub.onrender.com/api/leave-request', {
        method: 'POST', body: formDataToSend, credentials: 'include'
      });

      if (response.ok) {
        alert('Leave request submitted successfully!');
        setFormData({
          employee_id: "", name: "", department: "", designation: "",
          leave_type: "", start_date: "", end_date: "", leave_letter: null, reason: ""
        });
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Failed to submit leave request'}`);
      }
    } catch (error) {
      alert('An error occurred while submitting the leave request');
    }
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Staff Leave Hub</h1>
        <button style={styles.backButton} onClick={() => window.history.back()}>← Back</button>
      </header>
      
      <div style={styles.container}>
        <div style={styles.formCard}>
          <h2 style={styles.cardTitle}>Submit Leave Request</h2>
          <p style={styles.cardSubtitle}>Please fill in the details below to apply for a leave.</p>

          <form onSubmit={handleSubmit}>
            <div style={styles.formGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Employee ID</label>
                <input type="text" name="employee_id" placeholder="Enter ID" style={styles.input} value={formData.employee_id} onChange={handleChange} required />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Name</label>
                <input type="text" name="name" placeholder="Full Name" style={styles.input} value={formData.name} onChange={handleChange} required />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Department</label>
                <select name="department" style={styles.input} value={formData.department} onChange={handleChange} required>
                  <option value="">Select Department</option>
                  <option value="Mca">MCA</option>
                  <option value="Mba">MBA</option>
                  <option value="MA">MA</option>
                  <option value="Mcom">M.Com</option>
                  <option value="Bca">BCA</option>
                  <option value="Bba">BBA</option>
                  <option value="Bcom">B.Com</option>
                  <option value="Ba">BA</option>
                </select>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Designation</label>
                <input type="text" name="designation" placeholder="e.g. Assistant Professor" style={styles.input} value={formData.designation} onChange={handleChange} required />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Leave Type</label>
                <select name="leave_type" style={styles.input} value={formData.leave_type} onChange={handleChange} required>
                  <option value="">Select Type</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Casual Leave">Casual Leave</option>
                  <option value="Annual Leave">Annual Leave</option>
                </select>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Upload Document (Optional)</label>
                <input type="file" name="leave_letter" style={styles.fileInput} onChange={handleChange} accept=".pdf,.doc,.docx" />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Start Date</label>
                <input type="date" name="start_date" style={styles.input} value={formData.start_date} onChange={handleChange} required />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>End Date</label>
                <input type="date" name="end_date" style={styles.input} value={formData.end_date} onChange={handleChange} required />
              </div>
            </div>
            
            <div style={{...styles.inputGroup, marginBottom: '30px'}}>
              <label style={styles.label}>Reason for Leave (Max 400 words)</label>
              <textarea name="reason" placeholder="Please provide a clear reason for your leave..." style={styles.textarea} maxLength="2400" value={formData.reason} onChange={handleChange} required />
            </div>
            
            <button type="submit" style={styles.submitBtn}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(37, 99, 235, 0.3)'; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.2)'; }}
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: { margin: 0, padding: 0, fontFamily: "'Inter', sans-serif", background: '#f0f4f8', minHeight: '100vh', display: 'flex', flexDirection: 'column' },
  header: { background: 'white', padding: '15px 40px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { margin: 0, fontSize: '1.5rem', fontWeight: '800', background: 'linear-gradient(to right, #3b82f6, #2563eb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  backButton: { padding: '8px 16px', cursor: 'pointer', border: '1px solid #cbd5e1', backgroundColor: 'white', color: '#475569', borderRadius: '8px', fontWeight: '600' },
  container: { flex: 1, padding: '40px 20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' },
  formCard: { background: 'white', borderRadius: '24px', padding: '50px', boxShadow: '0 10px 40px rgba(0,0,0,0.06)', maxWidth: '850px', width: '100%', boxSizing: 'border-box' },
  cardTitle: { margin: '0 0 10px 0', fontSize: '1.8rem', fontWeight: '800', color: '#1e293b' },
  cardSubtitle: { margin: '0 0 40px 0', fontSize: '1rem', color: '#64748b' },
  formGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px', marginBottom: '25px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '0.9rem', color: '#475569', fontWeight: '700' },
  input: { padding: '14px 16px', border: '1px solid #cbd5e1', borderRadius: '10px', background: '#f8fafc', color: '#1e293b', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' },
  fileInput: { padding: '11px 16px', border: '1px dashed #94a3b8', borderRadius: '10px', background: '#f8fafc', color: '#64748b', fontSize: '0.95rem', boxSizing: 'border-box', cursor: 'pointer' },
  textarea: { padding: '16px', border: '1px solid #cbd5e1', borderRadius: '10px', background: '#f8fafc', color: '#1e293b', fontSize: '1rem', outline: 'none', minHeight: '120px', resize: 'vertical', boxSizing: 'border-box' },
  submitBtn: { width: '100%', padding: '16px', background: 'linear-gradient(to right, #3b82f6, #2563eb)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' }
};

export default LeaveRequest;
