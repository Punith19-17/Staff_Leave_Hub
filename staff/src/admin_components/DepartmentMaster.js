import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DepartmentPage() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [departmentCode, setDepartmentCode] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  // Fetch departments from the backend
  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://staff-leave-hub.onrender.com/api/departments");
      if (!response.ok) {
        throw new Error("Failed to fetch departments");
      }
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error("Error fetching departments:", error);
      setErrorMessage("Failed to fetch departments. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission to add a department
  const handleAddDepartment = async (e) => {
    e.preventDefault();
    if (!departmentCode || !departmentName) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("https://staff-leave-hub.onrender.com/api/departments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dept_code: departmentCode,
          dept_name: departmentName,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add department");
      }

      const newDepartment = await response.json();
      setDepartments([...departments, newDepartment]); // Add the new department to the list
      setDepartmentCode("");
      setDepartmentName("");
      setSuccessMessage("Department added successfully!");
      setErrorMessage("");
    } catch (error) {
      console.error("Error saving department:", error);
      setErrorMessage("Failed to add department. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Format as "MM/DD/YYYY, HH:mm:ss AM/PM"
  };

  // Styles for the component
  const styles = {
    container: { textAlign: "center", padding: "20px", background: `linear-gradient(135deg, #E4EfE9, #93A5CF)`},
    header: { background: "#4B4B4B", color: "white", padding: "10px" },
    backButton: { float: "right", background: "#FF5733", color: "white", padding: "10px", border: "none", borderRadius: "5px", cursor: "pointer" },
    form: { display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "20px" },
    input: { padding: "8px", width: "250px", marginBottom: "10px" },
    addButton: { background: "green", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer" },
    table: { width: "80%", margin: "auto", borderCollapse: "collapse" },
    tableHeader: { background: "#333", color: "white" },
    tableRow: { borderBottom: "1px solid #ccc" },
    successMessage: { color: "green", marginTop: "10px" },
    errorMessage: { color: "red", marginTop: "10px" },
    loadingMessage: { color: "blue", marginTop: "10px" },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Staff Leave Hub</h1>
      <button style={styles.backButton} onClick={() => navigate("/A_Dashboard")}>
        ← Back
      </button>
      <h2 style={{ marginTop: "60px" }}>Add New Department</h2>
      <form onSubmit={handleAddDepartment} style={styles.form}>
        <input
          type="text"
          placeholder="Department Code"
          value={departmentCode}
          onChange={(e) => setDepartmentCode(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Department Name"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.addButton} disabled={isLoading}>
          Add Department
        </button>
      </form>
      {isLoading && <p style={styles.loadingMessage}>Loading...</p>}
      {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
      {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
      <h2>Department list</h2>
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
            <th>Sr No</th>
            <th>Dept Name</th>
            <th>Dept Code</th>
            <th>Creation Date</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept, index) => (
            <tr key={dept.id} style={styles.tableRow}>
              <td>{index + 1}</td>
              <td>{dept.dept_name}</td>
              <td>{dept.dept_code}</td>
              <td>{formatDate(dept.date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DepartmentPage;