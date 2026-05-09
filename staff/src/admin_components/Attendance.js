import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const api = axios.create({
  baseURL: 'https://staffleavehub-production.up.railway.app',
  timeout: 10000
});

const AttendanceTracker = () => {
  const navigate = useNavigate();
  const [department, setDepartment] = useState('');
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleStatusChange = (employeeId, status) => {
    setAttendance(prev => ({
      ...prev,
      [employeeId]: status
    }));
  };

  const exportToExcel = () => {
    if (employees.length === 0) return setError('No employees to export');

    const data = employees.map(emp => ({
      'Employee ID': emp.employee_id,
      'Name': emp.name,
      'Department': department,
      'Date': selectedDate,
      'Attendance': attendance[emp.employee_id] || 'P'
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Attendance');
    XLSX.writeFile(wb, `${department}_Attendance_${selectedDate}.xlsx`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!department.trim()) return setError('Please enter a department name');
  
    setLoading(true);
    setError(null);
  
    try {
      const response = await api.get(`/api/attendance/employees/${encodeURIComponent(department)}`);
      if (!response.data.success) throw new Error(response.data.message || 'Department not found');
  
      setEmployees(response.data.data);
      const initialAttendance = {};
      response.data.data.forEach(emp => {
        initialAttendance[emp.employee_id] = 'P';
      });
      setAttendance(initialAttendance);
    } catch (error) {      
      setError(error.response?.data?.message || `Error loading employees: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <div style={styles.brand}>
          <div style={styles.logoIcon}>A</div>
          Staff Leave Hub
        </div>
        <button style={styles.backBtn} onClick={() => navigate(-1)}>Back</button>
      </nav>

      <main style={styles.main}>
        <div style={styles.header}>
          <h1 style={styles.title}>Staff Attendance</h1>
          <p style={styles.subtitle}>Track and manage daily attendance records.</p>
        </div>

        <div style={styles.formCard}>
          <form onSubmit={handleSubmit} style={styles.formRow}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Date</label>
              <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} style={styles.input} required />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Department Name</label>
              <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} style={styles.input} placeholder="e.g. Computer Science" required />
            </div>
            <button type="submit" style={styles.submitBtn}>
              {loading ? 'Loading...' : 'Fetch Employees'}
            </button>
          </form>
        </div>

        {error && <div style={styles.errorBanner}>{error}</div>}

        {employees.length > 0 && (
          <div style={styles.tableCard}>
            <div style={styles.tableHeader}>
              <h2 style={styles.tableTitle}>{department} Employees</h2>
              <button onClick={exportToExcel} style={styles.exportBtn}>Export to Excel</button>
            </div>
            
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Employee ID</th>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Attendance Status</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map(emp => (
                    <tr key={emp.employee_id} style={styles.tr}>
                      <td style={styles.td}>{emp.employee_id}</td>
                      <td style={styles.td}>{emp.name}</td>
                      <td style={styles.td}>
                        <select
                          value={attendance[emp.employee_id] || 'P'}
                          onChange={(e) => handleStatusChange(emp.employee_id, e.target.value)}
                          style={{
                            ...styles.select,
                            background: attendance[emp.employee_id] === 'A' ? '#FEF2F2' : '#ECFDF5',
                            color: attendance[emp.employee_id] === 'A' ? '#DC2626' : '#059669',
                            borderColor: attendance[emp.employee_id] === 'A' ? '#FCA5A5' : '#6EE7B7'
                          }}
                        >
                          <option value="P">Present</option>
                          <option value="A">Absent</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', background: '#F9FAFB', fontFamily: "'Inter', sans-serif" },
  navbar: { height: '70px', background: '#FFFFFF', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px' },
  brand: { fontSize: '20px', fontWeight: '800', color: '#111827', display: 'flex', alignItems: 'center', gap: '12px' },
  logoIcon: { background: '#4F46E5', color: 'white', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 'bold' },
  backBtn: { background: '#FFFFFF', color: '#4B5563', border: '1px solid #D1D5DB', padding: '8px 20px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' },
  main: { padding: '40px 60px', maxWidth: '1200px', margin: '0 auto' },
  header: { marginBottom: '40px' },
  title: { fontSize: '32px', fontWeight: '800', color: '#111827', margin: '0 0 10px 0' },
  subtitle: { fontSize: '16px', color: '#6B7280', margin: 0 },
  formCard: { background: '#FFFFFF', padding: '30px', borderRadius: '16px', border: '1px solid #E5E7EB', marginBottom: '30px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' },
  formRow: { display: 'flex', alignItems: 'flex-end', gap: '20px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 },
  label: { fontSize: '14px', fontWeight: '600', color: '#4B5563' },
  input: { padding: '12px 16px', border: '1px solid #D1D5DB', borderRadius: '8px', outline: 'none', fontSize: '15px' },
  submitBtn: { background: '#4F46E5', color: 'white', border: 'none', padding: '0 24px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', height: '45px', whiteSpace: 'nowrap' },
  errorBanner: { background: '#FEF2F2', color: '#DC2626', padding: '16px', borderRadius: '8px', border: '1px solid #FCA5A5', marginBottom: '30px', fontWeight: '500' },
  tableCard: { background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' },
  tableHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid #E5E7EB' },
  tableTitle: { margin: 0, fontSize: '18px', fontWeight: '700', color: '#111827' },
  exportBtn: { background: '#ECFDF5', color: '#059669', border: '1px solid #6EE7B7', padding: '8px 16px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' },
  tableWrapper: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
  th: { padding: '16px 24px', background: '#F9FAFB', color: '#4B5563', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid #E5E7EB' },
  td: { padding: '16px 24px', borderBottom: '1px solid #F3F4F6', color: '#111827', fontSize: '15px' },
  select: { width: '140px', padding: '8px 12px', borderRadius: '8px', border: '1px solid', outline: 'none', fontWeight: '600', cursor: 'pointer' }
};

export default AttendanceTracker;
