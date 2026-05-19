import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useIsMobile from './useIsMobile';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [backendErrorDetails, setBackendErrorDetails] = useState("");
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (employeeId || password) {
      setErrorMessage("");
      setBackendErrorDetails("");
    }
  }, [employeeId, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setBackendErrorDetails("");
    setSuccessMessage("");

    try {
      const response = await fetch("https://staff-leave-hub.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employee_id: employeeId, password }),
        credentials: 'include'
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Authentication failed");

      if (data.success) {
        setSuccessMessage("Login successful! Redirecting...");
        setShowModal(true);

        try {
          const currentDate = new Date();
          const loginRecord = {
            employee_id: employeeId,
            login_date: currentDate.toISOString().split('T')[0],
            login_time: currentDate.toTimeString().split(' ')[0]
          };
          const recordResponse = await fetch("https://staff-leave-hub.onrender.com/api/record-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginRecord),
            credentials: 'include'
          });
          if (!recordResponse.ok) {
            const errorData = await recordResponse.json();
            setBackendErrorDetails(errorData.sqlError ? `System note: ${errorData.sqlError}` : "Note: Login time not recorded (non-critical)");
          }
        } catch (recordError) {
          setBackendErrorDetails("Note: Login time recording failed (non-critical)");
        }

        setTimeout(() => { setShowModal(false); navigate("/Dashboard"); }, 1500);
      } else {
        throw new Error(data.message || "Invalid credentials");
      }
    } catch (error) {
      setErrorMessage(error.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackClick = () => {
    navigate("/Home", { replace: true });
    window.location.href = "/Home";
  };

  return (
    <div style={styles.page}>

      {/* Header Bar — Back button LEFT, title CENTER */}
      <header style={{ ...styles.headerBar, padding: isMobile ? '14px 16px' : '15px 40px', flexDirection: 'row' }}>
        {/* Back button always on the LEFT */}
        <button
          style={styles.backButton}
          onMouseOver={(e) => Object.assign(e.target.style, styles.backButtonHover)}
          onMouseOut={(e) => Object.assign(e.target.style, styles.backButton)}
          onClick={handleBackClick}
        >
          ← Back
        </button>

        {/* Title always CENTERED */}
        <div style={{
          ...styles.headerTitle,
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: isMobile ? '1.2rem' : '1.5rem'
        }}>
          Staff Leave Hub
        </div>

        {/* Invisible spacer to keep title truly centered */}
        <div style={{ visibility: 'hidden', padding: '8px 16px', fontSize: '0.95rem' }}>← Back</div>
      </header>

      {/* Login Card */}
      <div style={{ ...styles.card, padding: isMobile ? '30px 24px' : '50px 40px', marginTop: isMobile ? '80px' : '60px', width: isMobile ? '92%' : '420px' }}>
        <h2 style={styles.cardTitle}>Staff Login</h2>
        <p style={styles.cardSubtitle}>Welcome back! Please enter your details.</p>

        {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
        {backendErrorDetails && <div style={styles.backendError}>{backendErrorDetails}</div>}
        {successMessage && <div style={styles.successMessage}>{successMessage}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Employee ID</label>
            <input
              type="text"
              placeholder="Enter your employee ID"
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
              onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                style={{ ...styles.input, paddingRight: "40px" }}
                onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
              <span style={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)} title={showPassword ? "Hide password" : "Show password"}>
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </span>
            </div>
          </div>

          <div style={styles.forgotPasswordContainer}>
            <a href="/Forgotpass" style={styles.link}>Forgot password?</a>
          </div>

          <button
            type="submit"
            style={isLoading ? styles.loadingButton : styles.button}
            onMouseOver={(e) => !isLoading && (e.target.style.background = styles.buttonHover.background)}
            onMouseOut={(e) => !isLoading && (e.target.style.background = styles.button.background)}
            disabled={isLoading}
          >
            {isLoading ? (
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                Logging in... <span className="spinner" style={styles.spinner}></span>
              </span>
            ) : "Login"}
          </button>

          <div style={styles.signupContainer}>
            <span>Don't have an account? </span>
            <a href="/Signup" style={styles.linkBold}>Sign up</a>
          </div>
        </form>
      </div>

      {showModal && (
        <>
          <div style={styles.overlay}></div>
          <div style={styles.modal}>
            <div style={styles.modalIcon}>✓</div>
            <p style={styles.modalText}>{successMessage}</p>
          </div>
        </>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner { display: inline-block; width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-radius: 50%; border-top-color: #fff; animation: spin 1s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

const styles = {
  page: { margin: "0", padding: "0", fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", background: "linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%)", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" },
  headerBar: { width: "100%", background: "white", position: "absolute", top: 0, left: 0, display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", boxSizing: "border-box", zIndex: 10 },
  headerTitle: { fontSize: "1.5rem", fontWeight: "700", background: "linear-gradient(to right, #3b82f6, #2563eb)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", whiteSpace: 'nowrap' },
  backButton: { padding: "8px 16px", fontSize: "0.95rem", cursor: "pointer", border: "1px solid #cbd5e1", backgroundColor: "white", color: "#475569", borderRadius: "8px", fontWeight: "600", display: "flex", alignItems: "center", gap: "6px", whiteSpace: 'nowrap', flexShrink: 0 },
  backButtonHover: { backgroundColor: "#f8fafc", color: "#1e293b", borderColor: "#94a3b8" },
  card: { background: "white", borderRadius: "16px", boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)", maxWidth: "90%", textAlign: "center" },
  cardTitle: { fontSize: "1.8rem", fontWeight: "700", color: "#1e293b", marginBottom: "8px", marginTop: "0" },
  cardSubtitle: { color: "#64748b", fontSize: "0.95rem", marginBottom: "30px" },
  form: { display: "flex", flexDirection: "column", gap: "16px" },
  inputGroup: { textAlign: "left" },
  label: { fontWeight: "600", fontSize: "0.9rem", color: "#334155", display: "block", marginBottom: "6px" },
  input: { width: "100%", padding: "12px 16px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "16px", backgroundColor: "#f8fafc", color: "#1e293b", outline: "none", transition: "all 0.2s ease", boxSizing: "border-box" },
  eyeIcon: { position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", color: "#64748b", display: "flex", alignItems: "center" },
  button: { width: "100%", padding: "12px", border: "none", background: "linear-gradient(to right, #3b82f6, #2563eb)", color: "white", fontSize: "1rem", borderRadius: "8px", cursor: "pointer", transition: "0.2s", fontWeight: "600", marginTop: "8px", boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)" },
  buttonHover: { background: "linear-gradient(to right, #2563eb, #1d4ed8)" },
  loadingButton: { width: "100%", padding: "12px", border: "none", background: "linear-gradient(to right, #94a3b8, #64748b)", color: "white", fontSize: "1rem", borderRadius: "8px", cursor: "not-allowed", fontWeight: "600", marginTop: "8px" },
  forgotPasswordContainer: { textAlign: "right", marginTop: "-8px" },
  link: { color: "#3b82f6", textDecoration: "none", fontSize: "0.9rem", fontWeight: "500" },
  signupContainer: { marginTop: "16px", fontSize: "0.95rem", color: "#475569" },
  linkBold: { color: "#2563eb", textDecoration: "none", fontWeight: "600" },
  errorMessage: { backgroundColor: "#fef2f2", color: "#ef4444", padding: "10px", borderRadius: "6px", marginBottom: "16px", fontSize: "0.9rem", border: "1px solid #fca5a5" },
  backendError: { color: "#d97706", marginBottom: "16px", fontSize: "0.85rem", fontStyle: "italic" },
  successMessage: { backgroundColor: "#f0fdf4", color: "#16a34a", padding: "10px", borderRadius: "6px", marginBottom: "16px", fontSize: "0.9rem", border: "1px solid #86efac" },
  overlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(15, 23, 42, 0.6)", backdropFilter: "blur(4px)", zIndex: 999 },
  modal: { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "white", padding: "30px", borderRadius: "16px", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)", textAlign: "center", zIndex: 1000, minWidth: "280px", width: "90vw", maxWidth: "360px" },
  modalIcon: { width: "50px", height: "50px", borderRadius: "25px", background: "#dcfce7", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: "bold", margin: "0 auto 16px auto" },
  modalText: { margin: 0, fontSize: "1.1rem", fontWeight: "600", color: "#1e293b" },
  spinner: {}
};

export default Login;
