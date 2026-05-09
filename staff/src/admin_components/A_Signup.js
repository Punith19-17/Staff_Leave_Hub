import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://staff-leave-hub.onrender.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username,
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setUsername("");
        setEmail("");
        setPassword("");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("SIGNUP ERROR:", error);
      alert("Server error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <header style={styles.headerBar}>
        <div style={styles.headerTitle}>Staff Leave Hub</div>
        <button
          style={styles.backButton}
          onMouseOver={(e) => Object.assign(e.target.style, styles.backButtonHover)}
          onMouseOut={(e) => Object.assign(e.target.style, styles.backButton)}
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
      </header>

      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Sign Up</h2>
        <p style={styles.cardSubtitle}>Create a new account to access the portal.</p>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>User name</label>
            <input
              type="text"
              placeholder="Enter Username"
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = "#8b5cf6")}
              onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email ID</label>
            <input
              type="email"
              placeholder="Enter Email"
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = "#8b5cf6")}
              onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                style={{...styles.input, paddingRight: "40px"}}
                onFocus={(e) => (e.target.style.borderColor = "#8b5cf6")}
                onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
              <span
                style={styles.eyeIcon}
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "🔓" : "🔒"}
              </span>
            </div>
          </div>

          <button
            type="submit"
            style={isLoading ? styles.loadingButton : styles.button}
            onMouseOver={(e) => !isLoading && (e.target.style.background = styles.buttonHover.background)}
            onMouseOut={(e) => !isLoading && (e.target.style.background = styles.button.background)}
            disabled={isLoading}
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
          
          <div style={styles.signupContainer}>
            <span>Already have an account? </span>
            <span
              onClick={() => navigate("/Login")}
              style={{...styles.linkBold, cursor: "pointer"}}
            >
              Login
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    margin: "0",
    padding: "0",
    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%)",
    height: "100vh", /* Forces to viewport height */
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden" /* Kills any unwanted scrollbars */
  },
  headerBar: {
    width: "100%",
    background: "white",
    padding: "15px 40px",
    position: "absolute",
    top: 0,
    left: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    boxSizing: "border-box",
  },
  headerTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    background: "linear-gradient(to right, #8b5cf6, #6d28d9)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  backButton: {
    padding: "8px 16px",
    fontSize: "0.95rem",
    cursor: "pointer",
    border: "1px solid #cbd5e1",
    backgroundColor: "white",
    color: "#475569",
    borderRadius: "8px",
    transition: "all 0.2s ease",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  backButtonHover: {
    backgroundColor: "#f8fafc",
    color: "#1e293b",
    borderColor: "#94a3b8",
  },
  card: {
    background: "white",
    padding: "50px 40px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
    width: "420px",
    maxWidth: "90%",
    textAlign: "center",
    marginTop: "60px",
    boxSizing: "border-box",
  },
  cardTitle: {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "8px",
    marginTop: "0",
  },
  cardSubtitle: {
    color: "#64748b",
    fontSize: "0.95rem",
    marginBottom: "30px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  inputGroup: {
    textAlign: "left",
  },
  label: {
    fontWeight: "600",
    fontSize: "0.9rem",
    color: "#334155",
    display: "block",
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    fontSize: "1rem",
    backgroundColor: "#f8fafc",
    color: "#1e293b",
    outline: "none",
    transition: "all 0.2s ease",
    boxSizing: "border-box",
  },
  eyeIcon: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    fontSize: "1rem",
    color: "#64748b",
  },
  button: {
    width: "100%",
    padding: "12px",
    border: "none",
    background: "linear-gradient(to right, #8b5cf6, #6d28d9)",
    color: "white",
    fontSize: "1rem",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.2s",
    fontWeight: "600",
    marginTop: "8px",
    boxShadow: "0 4px 12px rgba(139, 92, 246, 0.2)",
  },
  buttonHover: {
    background: "linear-gradient(to right, #7c3aed, #5b21b6)",
  },
  loadingButton: {
    width: "100%",
    padding: "12px",
    border: "none",
    background: "linear-gradient(to right, #94a3b8, #64748b)",
    color: "white",
    fontSize: "1rem",
    borderRadius: "8px",
    cursor: "not-allowed",
    fontWeight: "600",
    marginTop: "8px",
  },
  signupContainer: {
    marginTop: "16px",
    fontSize: "0.95rem",
    color: "#475569",
  },
  linkBold: {
    color: "#7c3aed",
    textDecoration: "none",
    fontWeight: "600",
  }
};

export default Signup;
