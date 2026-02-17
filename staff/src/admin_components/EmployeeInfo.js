import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function EmployeeInfo() {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle button clicks
  const handleButtonClick = (path) => {
    navigate(path); // Navigate to the specified path
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body, html {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #E4EfE9, #93A5CF);
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .header {
          width: 100%;
          text-align: center;
          padding: 30px;
          font-size: 3rem;
          font-weight: bold;
          background: linear-gradient(135deg, #8e9eab, rgb(168, 178, 178));
          color: black;
          position: absolute;
          top: 0;
          left: 0;
        }

        .back-button {
          position: absolute;
          top: 20px;
          right: 20px;
          background: linear-gradient(135deg, #6A11CB, #2575FC);
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          font-size: 1.5rem;
          font-weight: bold;
          cursor: pointer;
        }

        .back-button:hover {
          background: linear-gradient(135deg, #4C9AFF, #A6C8FF);
        }

        .employee-info {
          position: absolute;
          top: 160px;
          left: 50px;
          font-size: 2.8rem;
          font-weight: bold;
          color:rgb(52, 50, 50);
        }

        .button-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          margin-top: 80px;
        }

        .row {
          display: flex;
          gap: 30px;
        }

        .category-button {
          background: linear-gradient(135deg, #E8F5C8, #9FA5D5);
          color: white;
          padding: 20px 60px;
          border: none;
          border-radius: 12px;
          font-size: 2.5rem;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
        }

        .category-button:hover {
          background: linear-gradient(135deg, #D1E8FF, #B3CFF2);
        }
      `}</style>

      <div className="header">Staff Leave Hub</div>
      <button className="back-button" onClick={() => navigate("/A_Dashboard")}>
          Back
        </button>
      <div className="employee-info">Employee Info</div>

      <div className="button-container">
        <div className="row">
          {/* Teaching Staff Button */}
          <button
            className="category-button"
            onClick={() => handleButtonClick("/A_personalinfo")} // Navigate to /teaching-staff
          >
            Teaching Staff
          </button>

          {/* Non-Teaching Staff Button */}
          <button
            className="category-button"
            onClick={() => handleButtonClick("/A_personalinfo")} // Navigate to /non-teaching-staff
          >
            Non-Teaching Staff
          </button>
        </div>

        {/* Employee Button */}
       
      </div>
    </>
  );
}

export default EmployeeInfo;