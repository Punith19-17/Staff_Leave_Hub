import React, { useState } from "react";

const LeaveRequest = () => {
  const [formData, setFormData] = useState({
    employee_id: "",
    name: "",
    department: "",
    designation: "",
    leave_type: "",
    start_date: "",
    end_date: "",
    leave_letter: null,
    reason: ""
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await fetch('http://localhost:5000/api/leave-request', {
        method: 'POST',
        body: formDataToSend,
        credentials: 'include'
      });

      if (response.ok) {
        alert('Leave request submitted successfully!');
        // Reset form
        setFormData({
          employee_id: "",
          name: "",
          department: "",
          designation: "",
          leave_type: "",
          start_date: "",
          end_date: "",
          leave_letter: null,
          reason: ""
        });
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Failed to submit leave request'}`);
      }
    } catch (error) {
      console.error('Error submitting leave request:', error);
      alert('An error occurred while submitting the leave request');
    }
  };

  // Your existing styles remain the same
  const pageStyle = {
    margin: "0",
    padding: "0",
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(135deg, #E4EfE9, #93A5CF)",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  };

  const headerStyle = {
    fontSize: "35px",
    fontWeight: "bold",
    color: "black",
    background: "linear-gradient(135deg, #8e9eab, rgb(168, 178, 178))",
    width: "100%",
    textAlign: "center",
    padding: "15px 20px",
    position: "absolute",
    top: "0",
    left: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const backButtonStyle = {
    position: "absolute",
    right: "20px",
    padding: "8px 15px",
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  };

  const cardStyle = {
    background: "linear-gradient(135deg, #E8F5C8, #9FA5D5)",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
    width: "750px",
    textAlign: "left",
    marginTop: "50px",
  };

  const inputGroupStyle = {
    display: "flex",
    flexDirection: "column",
    marginBottom: "15px",
  };

  const labelStyle = {
    fontWeight: "bold",
    marginBottom: "5px",
  };

  const inputStyle = {
    width: "80%",
    padding: "10px",
    borderRadius: "5px",
    fontSize: "16px",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    border: "none",
    background: "linear-gradient(to right, #0083B0, #00B4DB)",
    color: "white",
    fontSize: "18px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  };

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        Staff Leave Hub
        <button style={backButtonStyle} onClick={() => window.history.back()}>Back</button>
      </div>
      
      <div style={cardStyle}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Employee ID:</label>
              <input 
                type="text" 
                name="employee_id"
                placeholder="Enter your employee ID" 
                style={inputStyle} 
                value={formData.employee_id}
                onChange={handleChange}
                required 
              />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Name:</label>
              <input 
                type="text" 
                name="name"
                placeholder="Enter your name" 
                style={inputStyle} 
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Department:</label>
              <select 
                name="department"
                style={inputStyle}
                value={formData.department}
                onChange={handleChange}
              >
                <option value="">Select Department</option>
                <option value="Mca">Mca</option>
                <option value="Mba">Mba</option>
                <option value="MA">Ma</option>
                <option value="Mcom">Mcom</option>
                <option value="Bca">Bca</option>
                <option value="Bba">Bba</option>
                <option value="Bcom">Bcom</option>
                <option value="Ba">Ba</option>
              </select>
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Designation:</label>
              <input 
                type="text" 
                name="designation"
                placeholder="Enter your designation" 
                style={inputStyle} 
                value={formData.designation}
                onChange={handleChange}
                required 
              />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Leave Type:</label>
              <select 
                name="leave_type"
                style={inputStyle}
                value={formData.leave_type}
                onChange={handleChange}
              >
                <option value="">Select Leave Type</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Annual Leave">Annual Leave</option>
              </select>
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Start Date:</label>
              <input 
                type="date" 
                name="start_date"
                style={inputStyle} 
                value={formData.start_date}
                onChange={handleChange}
                required 
              />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>End Date:</label>
              <input 
                type="date" 
                name="end_date"
                style={inputStyle} 
                value={formData.end_date}
                onChange={handleChange}
                required 
              />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Upload Leave Letter:</label>
              <input 
                type="file" 
                name="leave_letter"
                style={inputStyle} 
                onChange={handleChange}
                accept=".pdf,.doc,.docx"
              />
            </div>
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Reason (400 words max):</label>
            <textarea 
              name="reason"
              placeholder="Enter your reason" 
              style={{ ...inputStyle, height: "100px" }} 
              maxLength="2400" 
              value={formData.reason}
              onChange={handleChange}
              required 
            />
          </div>
          <button type="submit" style={buttonStyle}>Submit Request</button>
        </form>
      </div>
    </div>
  );
};

export default LeaveRequest;