import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Leaveapplication.css';

const LeaveApplications = () => {
  const navigate = useNavigate();
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        setLoading(true);
        
        const response = await fetch("https://staffleavehub-production.up.railway.app/api/leave-requests", {
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Server error: ${response.status} - ${errorData}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          throw new Error(`Expected JSON but got ${contentType}. Response: ${text}`);
        }
        
        const data = await response.json();
        setLeaveRequests(data.data || []);
        setError(null);
        
      } catch (error) {
        console.error("API Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveRequests();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getLeaveLetterUrl = (letterPath) => {
    if (!letterPath) return null;
    if (letterPath.startsWith('http://') || letterPath.startsWith('https://')) {
      return letterPath;
    }
    return `https://staffleavehub-production.up.railway.app/${letterPath.replace(/^\//, '')}`;
  };

  const handleBackClick = () => {
    navigate('/A_Dashboard');
  };

  return (
    <div className="page-style">
      <div className="header-style">
        Staff Leave Hub
        <button className="back-button" onClick={handleBackClick}>Back</button>
      </div>
      <h2 className="page-title">
        Leave Status
      </h2>

      {loading && <p>Loading leave requests...</p>}
      {error && <p className="error-message">Error: {error}</p>}

      <div className="table-container">
        <table className="leave-table">
          <thead>
            <tr className="table-header">
              <th className="table-header-cell">Employee ID</th>
              <th className="table-header-cell">Name</th>
              <th className="table-header-cell">Department</th>
              <th className="table-header-cell">Designation</th>
              <th className="table-header-cell">Leave Type</th>
              <th className="table-header-cell">Start Date</th>
              <th className="table-header-cell">End Date</th>
              <th className="table-header-cell">Reason</th>
              <th className="table-header-cell">Leave Letter</th>
              <th className="table-header-cell">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.length > 0 ? (
              leaveRequests.map((request) => {
                const letterUrl = getLeaveLetterUrl(request.leave_letter);
                return (
                  <tr 
                    key={request.id} 
                    className="table-row"
                  >
                    <td className="table-cell">{request.employee_id}</td>
                    <td className="table-cell">{request.name}</td>
                    <td className="table-cell">{request.department}</td>
                    <td className="table-cell">{request.designation}</td>
                    <td className="table-cell">{request.leave_type}</td>
                    <td className="table-cell">{formatDate(request.start_date)}</td>
                    <td className="table-cell">{formatDate(request.end_date)}</td>
                    <td className="table-cell reason-cell">{request.reason || "Not specified"}</td>
                    <td className="table-cell">
                      {letterUrl ? (
                        <a 
                          href={letterUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="letter-link"
                        >
                          View
                        </a>
                      ) : (
                        <span className="no-letter">None</span>
                      )}
                    </td>
                    <td className="table-cell">
                      <span className={`status-badge ${request.status?.toLowerCase()}`}>
                        {request.status || "Pending"}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="10" className="no-data">
                  {loading ? "Loading..." : "No leave requests found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveApplications;