import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PersonalInfo() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employee_id: "",
    employee_type: "",
    name: "",
    email_id: "",
    gender: "",
    dob: "",
    mobile_no: "",
    permanent_address: "",
    adhar_number: "",
    department: "",
    designation: "",
    doj: "",
    profile_picture: null,
  });
  
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profile_picture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);
    setMessage("");
  
    try {
      const checkResponse = await axios.get(
        `https://staff-leave-hub.onrender.com/api/check-employee-id/${formData.employee_id}`
      );
      if (checkResponse.data.exists) {
        setIsError(true);
        setMessage("Employee ID already exists. Please use a different ID.");
        return;
      }
    } catch (error) {
      console.error("Error checking employee ID:", error);
    }
  
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
  
    try {
      const response = await axios.post("https://staff-leave-hub.onrender.com/api/personal-information", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setIsError(false);
      setMessage(response.data.message || "Data submitted successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setIsError(true);
      setMessage("Failed to submit data. Please try again.");
    }
  };

  const handleNext = () => {
    navigate("/qualification");
  };

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body, html { font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #F9FAFB; }
        .container { min-height: 100vh; background: #F9FAFB; display: flex; flex-direction: column; }
        .navbar { height: 70px; background: #FFFFFF; border-bottom: 1px solid #E5E7EB; display: flex; align-items: center; justify-content: space-between; padding: 0 40px; position: sticky; top: 0; z-index: 10; }
        .brand { font-size: 20px; font-weight: 800; color: #111827; display: flex; align-items: center; gap: 12px; }
        .logo-icon { background: #4F46E5; color: white; width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: bold; }
        .back-btn { background: #FFFFFF; color: #4B5563; border: 1px solid #D1D5DB; padding: 8px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; }
        .back-btn:hover { background: #F3F4F6; }
        
        .main-content { padding: 40px 60px; max-width: 1100px; margin: 0 auto; width: 100%; }
        .page-header { margin-bottom: 30px; text-align: center; }
        .page-title { font-size: 32px; font-weight: 800; color: #111827; margin: 0 0 10px 0; }
        .page-subtitle { font-size: 16px; color: #6B7280; margin: 0; }
        .form-card { background: #FFFFFF; padding: 40px; border-radius: 16px; border: 1px solid #E5E7EB; box-shadow: 0 4px 6px rgba(0,0,0,0.02); }
        
        .form-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        @media (max-width: 900px) { .form-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .form-grid { grid-template-columns: 1fr; } }
        
        .input-group { display: flex; flex-direction: column; gap: 8px; }
        .input-label { font-size: 14px; font-weight: 600; color: #4B5563; }
        .form-input, .form-select { padding: 12px 16px; border: 1px solid #D1D5DB; border-radius: 8px; outline: none; font-size: 15px; color: #111827; background: #FFFFFF; width: 100%; transition: border-color 0.2s ease; }
        .form-input:focus, .form-select:focus { border-color: #4F46E5; }
        
        .btn-container { display: flex; justify-content: center; gap: 16px; margin-top: 40px; }
        .primary-btn { background: #4F46E5; color: white; border: none; padding: 12px 30px; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 16px; transition: all 0.2s ease; min-width: 140px; }
        .primary-btn:hover { opacity: 0.9; transform: translateY(-1px); }
        .secondary-btn { background: #FFFFFF; color: #4F46E5; border: 1px solid #4F46E5; padding: 12px 30px; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 16px; transition: all 0.2s ease; min-width: 140px; }
        .secondary-btn:hover { background: #F3F4F6; }
        .msg-banner { padding: 16px; border-radius: 8px; margin-top: 20px; font-weight: 500; text-align: center; }
        .msg-success { background: #ECFDF5; color: #059669; border: 1px solid #6EE7B7; }
        .msg-error { background: #FEF2F2; color: #DC2626; border: 1px solid #FCA5A5; }
      `}</style>

      <div className="container">
        <nav className="navbar">
          <div className="brand">
            <div className="logo-icon">A</div>
            Staff Leave Hub
          </div>
          <button className="back-btn" onClick={() => navigate("/Login")}>
            Back
          </button>
        </nav>

        <main className="main-content">
          <div className="page-header">
            <h1 className="page-title">Personal Information</h1>
            <p className="page-subtitle">Enter the employee's basic details and contact information.</p>
          </div>

          <div className="form-card">
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="input-group">
                  <label className="input-label">Employee ID</label>
                  <input type="text" name="employee_id" placeholder="Enter Employee ID" value={formData.employee_id} onChange={handleChange} className="form-input" required />
                </div>
                <div className="input-group">
                  <label className="input-label">Employee Type</label>
                  <select name="employee_type" value={formData.employee_type} onChange={handleChange} className="form-select" required>
                    <option value="">Select Employee Type</option>
                    <option>Teaching</option>
                    <option>Non-Teaching</option>
                  </select>
                </div>
                <div className="input-group">
                  <label className="input-label">Name</label>
                  <input type="text" name="name" placeholder="Enter Name" value={formData.name} onChange={handleChange} className="form-input" required />
                </div>
                <div className="input-group">
                  <label className="input-label">Email ID</label>
                  <input type="email" name="email_id" placeholder="Enter Email ID" value={formData.email_id} onChange={handleChange} className="form-input" required />
                </div>
                <div className="input-group">
                  <label className="input-label">Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className="form-select" required>
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="input-group">
                  <label className="input-label">Date of Birth</label>
                  <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="form-input" required />
                </div>
                <div className="input-group">
                  <label className="input-label">Mobile No</label>
                  <input type="text" name="mobile_no" placeholder="Enter Mobile No" value={formData.mobile_no} onChange={handleChange} className="form-input" required />
                </div>
                <div className="input-group">
                  <label className="input-label">Permanent Address</label>
                  <input type="text" name="permanent_address" placeholder="Enter Permanent Address" value={formData.permanent_address} onChange={handleChange} className="form-input" required />
                </div>
                <div className="input-group">
                  <label className="input-label">Aadhar Number</label>
                  <input type="text" name="adhar_number" placeholder="Enter Aadhar Number" value={formData.adhar_number} onChange={handleChange} className="form-input" required />
                </div>
                <div className="input-group">
                  <label className="input-label">Department</label>
                  <input type="text" name="department" placeholder="Enter Department" value={formData.department} onChange={handleChange} className="form-input" required />
                </div>
                <div className="input-group">
                  <label className="input-label">Designation</label>
                  <input type="text" name="designation" placeholder="Enter Designation" value={formData.designation} onChange={handleChange} className="form-input" required />
                </div>
                <div className="input-group">
                  <label className="input-label">Date of Joining</label>
                  <input type="date" name="doj" value={formData.doj} onChange={handleChange} className="form-input" required />
                </div>
                
                <div className="input-group">
                  <label className="input-label">Profile Picture</label>
                  {/* Using native style so it NEVER breaks in any browser */}
                  <input 
                    type="file" 
                    name="profile_picture" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    style={{ marginTop: '10px', fontSize: '15px', cursor: 'pointer' }} 
                    required 
                  />
                </div>
              </div>

              {message && (
                <div className={`msg-banner ${isError ? 'msg-error' : 'msg-success'}`}>
                  {message}
                </div>
              )}

              <div className="btn-container">
                <button type="submit" className="primary-btn">Submit</button>
                <button type="button" onClick={handleNext} className="secondary-btn">Next</button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}

export default PersonalInfo;
