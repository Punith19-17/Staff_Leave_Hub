import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function QualificationDetails() {
  const navigate = useNavigate();
  const API_URL = "https://staff-leave-hub.onrender.com";
  
  const [formData, setFormData] = useState({
    employee_id: "",
    qualification: "",
    specialization: "",
    year_of_pass: "",
    qualification_documents: null,
  });

  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("employee_id", formData.employee_id);
      data.append("qualification", formData.qualification);
      data.append("specialization", formData.specialization);
      data.append("year_of_pass", formData.year_of_pass);
      data.append("qualification_documents", formData.qualification_documents);

      const response = await fetch(`${API_URL}/submit-qualification`, {
        method: "POST",
        body: data,
      });

      const text = await response.text();
      let result = {};
      try { result = JSON.parse(text); } catch (err) {}

      if (response.ok) {
        alert("Qualification data inserted successfully");
        setFormData({
          employee_id: "",
          qualification: "",
          specialization: "",
          year_of_pass: "",
          qualification_documents: null,
        });
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        alert(result.message || "Failed to insert data");
      }
    } catch (error) {
      alert("Server error occurred");
    }
  };

  const handleNext = () => {
    const { employee_id, qualification, specialization, year_of_pass, qualification_documents } = formData;
    if (!employee_id || !qualification || !specialization || !year_of_pass || !qualification_documents) {
      alert("Please fill in all fields before proceeding.");
      return;
    }
    if (!/^\d{4}$/.test(year_of_pass)) {
      alert("Year of passing must be a 4-digit year");
      return;
    }
    navigate("/Service");
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "qualification_documents") {
      const file = files[0];
      if (!file) return;
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        alert("Only PDF, DOC, and DOCX files are allowed.");
        return;
      }
      if (file.size > 50 * 1024 * 1024) {
        alert("File size must be less than 50MB.");
        return;
      }
      setFormData({ ...formData, [name]: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
        .main-content { padding: 40px 60px; max-width: 1000px; margin: 0 auto; width: 100%; }
        .page-header { margin-bottom: 30px; text-align: center; }
        .page-title { font-size: 32px; font-weight: 800; color: #111827; margin: 0 0 10px 0; }
        .page-subtitle { font-size: 16px; color: #6B7280; margin: 0; }
        .form-card { background: #FFFFFF; padding: 40px; border-radius: 16px; border: 1px solid #E5E7EB; box-shadow: 0 4px 6px rgba(0,0,0,0.02); }
        .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
        .input-group { display: flex; flex-direction: column; gap: 8px; }
        .input-label { font-size: 14px; font-weight: 600; color: #4B5563; }
        .form-input { padding: 12px 16px; border: 1px solid #D1D5DB; border-radius: 8px; outline: none; font-size: 15px; color: #111827; background: #FFFFFF; width: 100%; transition: border-color 0.2s ease; }
        .form-input:focus { border-color: #4F46E5; }
        
        .file-input { padding: 8px; border: 1px solid #D1D5DB; border-radius: 8px; font-size: 14px; color: #4B5563; width: 100%; cursor: pointer; background: #FFFFFF; transition: border-color 0.2s ease; }
        .file-input:hover { border-color: #4F46E5; }
        .file-input::file-selector-button { padding: 6px 12px; margin-right: 12px; border: none; border-radius: 4px; background-color: #EEF2FF; color: #4F46E5; font-weight: 600; cursor: pointer; transition: background-color 0.2s ease; }
        .file-input::file-selector-button:hover { background-color: #E0E7FF; }
        
        .btn-container { display: flex; justify-content: center; gap: 16px; margin-top: 40px; }
        .primary-btn { background: #4F46E5; color: white; border: none; padding: 12px 30px; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 16px; transition: all 0.2s ease; min-width: 140px; }
        .primary-btn:hover { opacity: 0.9; transform: translateY(-1px); }
        .secondary-btn { background: #FFFFFF; color: #4F46E5; border: 1px solid #4F46E5; padding: 12px 30px; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 16px; transition: all 0.2s ease; min-width: 140px; }
        .secondary-btn:hover { background: #F3F4F6; }
      `}</style>

      <div className="container">
        <nav className="navbar">
          <div className="brand">
            <div className="logo-icon">A</div>
            Staff Leave Hub
          </div>
        </nav>

        <main className="main-content">
          <div className="page-header">
            <h1 className="page-title">Qualification Details</h1>
            <p className="page-subtitle">Provide academic qualifications and relevant documentation.</p>
          </div>

          <div className="form-card">
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="input-group">
                  <label className="input-label">Employee ID</label>
                  <input type="text" name="employee_id" placeholder="Enter Employee ID" required value={formData.employee_id} onChange={handleChange} className="form-input" />
                </div>
                <div className="input-group">
                  <label className="input-label">Qualification</label>
                  <input type="text" name="qualification" placeholder="Enter Qualification" required value={formData.qualification} onChange={handleChange} className="form-input" />
                </div>
                <div className="input-group">
                  <label className="input-label">Specialization</label>
                  <input type="text" name="specialization" placeholder="Enter Specialization" required value={formData.specialization} onChange={handleChange} className="form-input" />
                </div>
                <div className="input-group">
                  <label className="input-label">Year of Passing</label>
                  <input type="text" name="year_of_pass" placeholder="Enter Year of Passing" required value={formData.year_of_pass} onChange={handleChange} className="form-input" />
                </div>
                <div className="input-group">
                  <label className="input-label">Qualification Documents</label>
                  <input type="file" name="qualification_documents" accept=".pdf,.doc,.docx" required onChange={handleChange} ref={fileInputRef} className="file-input" />
                </div>
              </div>

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

export default QualificationDetails;
