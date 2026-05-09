import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ServiceDetails() {
  const [formData, setFormData] = useState({
    employee_id: "",
    name_of_organization: "",
    s_from: "",
    s_to: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://staff-leave-hub.onrender.com/api/experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Data submitted successfully!");
        setFormData({
          employee_id: "",
          name_of_organization: "",
          s_from: "",
          s_to: "",
        });
      } else {
        alert("Failed to submit data.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("An error occurred while submitting data.");
    }
  };

  const handleNext = () => {
    navigate("/Emppass");
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
            <h1 className="page-title">Service Details</h1>
            <p className="page-subtitle">Enter the prior employment and experience details.</p>
          </div>

          <div className="form-card">
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="input-group">
                  <label className="input-label">Employee ID</label>
                  <input type="text" name="employee_id" placeholder="Enter Employee ID" value={formData.employee_id} onChange={handleChange} className="form-input" required />
                </div>
                <div className="input-group">
                  <label className="input-label">Name of Organization</label>
                  <input type="text" name="name_of_organization" placeholder="Enter Name of Organization" value={formData.name_of_organization} onChange={handleChange} className="form-input" required />
                </div>
                <div className="input-group">
                  <label className="input-label">Service From</label>
                  <input type="date" name="s_from" value={formData.s_from} onChange={handleChange} className="form-input" required />
                </div>
                <div className="input-group">
                  <label className="input-label">Service To</label>
                  <input type="date" name="s_to" value={formData.s_to} onChange={handleChange} className="form-input" required />
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

export default ServiceDetails;
