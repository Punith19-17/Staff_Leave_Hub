import React, { useState } from "react";

const Login = () => {
  const [empId, setEmpId] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (empId && phone) {
      setOtpSent(true);
    } else {
      alert("Please enter both Employee ID and Phone Number.");
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp) {
      alert("OTP Verified Successfully!");
      // Add your login success logic here
    } else {
      alert("Please enter the OTP.");
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
        .back-btn { background: #FFFFFF; color: #4B5563; border: 1px solid #D1D5DB; padding: 8px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; }
        .back-btn:hover { background: #F3F4F6; }
        
        .main-content { padding: 40px 60px; max-width: 550px; margin: 40px auto 0; width: 100%; } 
        
        .page-header { margin-bottom: 30px; text-align: center; }
        .page-title { font-size: 32px; font-weight: 800; color: #111827; margin: 0 0 10px 0; }
        .page-subtitle { font-size: 16px; color: #6B7280; margin: 0; }
        
        .form-card { background: #FFFFFF; padding: 40px; border-radius: 16px; border: 1px solid #E5E7EB; box-shadow: 0 4px 6px rgba(0,0,0,0.02); }
        .form-grid { display: grid; grid-template-columns: 1fr; gap: 20px; } 
        
        .input-group { display: flex; flex-direction: column; gap: 8px; }
        .input-label { font-size: 14px; font-weight: 600; color: #4B5563; }
        .form-input { padding: 12px 16px; border: 1px solid #D1D5DB; border-radius: 8px; outline: none; font-size: 15px; color: #111827; background: #FFFFFF; width: 100%; transition: border-color 0.2s ease; }
        .form-input:focus { border-color: #4F46E5; }
        
        .btn-container { display: flex; justify-content: center; gap: 16px; margin-top: 30px; }
        .primary-btn { background: #4F46E5; color: white; border: none; padding: 12px 30px; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 16px; transition: all 0.2s ease; width: 100%; }
        .primary-btn:hover { opacity: 0.9; transform: translateY(-1px); }
        
        .success-text { color: #059669; font-weight: 600; font-size: 14px; text-align: center; margin-bottom: 15px; padding: 12px; background: #ECFDF5; border-radius: 6px; border: 1px solid #6EE7B7; }
      `}</style>

      <div className="container">
        <nav className="navbar">
          <div className="brand">
            <div className="logo-icon">A</div>
            Staff Leave Hub
          </div>
          <button type="button" className="back-btn" onClick={() => window.history.back()}>
            Back
          </button>
        </nav>

        <main className="main-content">
          <div className="page-header">
            <h1 className="page-title">Forgot Password</h1>
            <p className="page-subtitle">Verify your identity to reset your password.</p>
          </div>

          <div className="form-card">
            <form onSubmit={otpSent ? handleOtpSubmit : handleSubmit}>
              <div className="form-grid">
                {!otpSent ? (
                  <>
                    <div className="input-group">
                      <label className="input-label">Employee ID</label>
                      <input
                        type="text"
                        placeholder="Enter your Employee ID"
                        value={empId}
                        onChange={(e) => setEmpId(e.target.value)}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="input-group">
                      <label className="input-label">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="Enter your Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="form-input"
                        required
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="success-text">
                      OTP has been sent to your mobile number.
                    </div>
                    <div className="input-group">
                      <label className="input-label">Enter OTP</label>
                      <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="form-input"
                        required
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="btn-container">
                <button type="submit" className="primary-btn">
                  {otpSent ? "Submit OTP" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default Login;
