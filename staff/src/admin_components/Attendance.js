import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Attendance.css';

// Create axios instance with base URL
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

  const handleBack = () => {
    navigate(-1);
  };

  const handleStatusChange = (employeeId, status) => {
    setAttendance(prev => ({
      ...prev,
      [employeeId]: status
    }));
  };

  const exportToExcel = () => {
    if (employees.length === 0) {
      setError('No employees to export');
      return;
    }

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

    const range = XLSX.utils.decode_range(ws['!ref']);
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell_address = { c: C, r: R };
        const cell_ref = XLSX.utils.encode_cell(cell_address);
        
        if (!ws[cell_ref]) continue;
        
        if (R === 0) {
          ws[cell_ref].s = {
            fill: { 
              patternType: 'solid', 
              fgColor: { rgb: '4F81BD' }
            },
            font: { 
              color: { rgb: 'FFFFFF' }, 
              bold: true 
            },
            alignment: { horizontal: 'center' }
          };
        } else {
          const status = data[R-1].Attendance;
          let color;
          if (status === 'P') {
            color = 'A9D08E';
          } else {
            color = 'FF7F7F';
          }
          
          ws[cell_ref].s = {
            fill: { patternType: 'solid', fgColor: { rgb: color } },
            alignment: { horizontal: 'center' }
          };
        }
      }
    }

    XLSX.writeFile(wb, `${department}_Attendance_${selectedDate}.xlsx`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!department.trim()) {
      setError('Please enter a department name');
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      const response = await api.get(`/api/attendance/employees/${encodeURIComponent(department)}`);
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Department not found');
      }
  
      setEmployees(response.data.data);
      
      const initialAttendance = {};
      response.data.data.forEach(emp => {
        initialAttendance[emp.employee_id] = 'P';
      });
      setAttendance(initialAttendance);
  
    } catch (error) {      
      setError(error.response?.data?.message || 
              `Error loading employees: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="attendance-container">
      <button 
        onClick={handleBack}
        className="back-button"
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '8px 16px',
          backgroundColor: '#f0f0f0',
          border: '1px solid #ccc',
          borderRadius: '4px',
          cursor: 'pointer',
          zIndex: 1000
        }}
      >
        Back
      </button>
      
      <h1>Staff Attendance</h1>
      
      <form onSubmit={handleSubmit} className="attendance-form">
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="department">Department Name:</label>
          <input
            type="text"
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Enter department name"
            required
          />
        </div>
        
        <button type="submit" className="submit-btn">
          {loading ? 'Loading...' : 'Get Employees'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {employees.length > 0 && (
        <>
          <div className="employee-list">
            <h2>{department} Employees</h2>
            <table>
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(emp => (
                  <tr key={emp.employee_id}>
                    <td>{emp.employee_id}</td>
                    <td>{emp.name}</td>
                    <td>
                      <select
                        value={attendance[emp.employee_id] || 'P'}
                        onChange={(e) => handleStatusChange(emp.employee_id, e.target.value)}
                        className={`status-select ${attendance[emp.employee_id] === 'A' ? 'absent' : 'present'}`}
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

          <button onClick={exportToExcel} className="export-btn">
            Export to Excel
          </button>
        </>
      )}
    </div>
  );
};

export default AttendanceTracker;