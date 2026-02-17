import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HolidayCalendar.css';

const HolidayCalendar = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    month: '',
    year: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleBackClick = () => {
    navigate('/A_Dashboard');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate month format
    const validMonths = ['January', 'February', 'March', 'April', 'May', 'June', 
                        'July', 'August', 'September', 'October', 'November', 'December'];
    if (!validMonths.includes(formData.month)) {
      setMessage('Please enter a valid month name (e.g. "January")');
      setIsError(true);
      return;
    }
  
    // Validate year format
    if (!/^\d{4}$/.test(formData.year)) {
      setMessage('Year must be 4 digits (e.g. 2023)');
      setIsError(true);
      return;
    }
  
    const formDataToSend = new FormData();
    formDataToSend.append('month', formData.month);
    formDataToSend.append('year', formData.year);
    if (selectedFile) {
      formDataToSend.append('image', selectedFile);
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/holidays', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data.success) {
        setMessage(response.data.message || 'Holiday calendar saved successfully!');
        setIsError(false);
        // Reset form
        setFormData({ month: '', year: '' });
        setSelectedFile(null);
        setPreviewImage(null);
      } else {
        setMessage(response.data.message || 'Operation failed');
        setIsError(true);
      }
    } catch (error) {
      let errorMessage = 'Failed to save holiday calendar. Please try again.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      setMessage(errorMessage);
      setIsError(true);
      console.error('Error:', error.response ? error.response.data : error);
    }
  };

  return (
    <div className="holiday-calendar-container">
      <header className="app-header">
        <h1>Staff Leave Hub</h1>
        <button className="back-button" onClick={handleBackClick}>Back</button>
      </header>
      
      <main className="calendar-main">
        <div className="calendar-card">
          <h2 className="calendar-title">Holidays Calendar</h2>
          
          {message && (
            <div className={`message ${isError ? 'error' : 'success'}`}>
              {message}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="calendar-form">
            <div className="form-group">
              <label htmlFor="month">Month</label>
              <select
                id="month"
                name="month"
                value={formData.month}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a month</option>
                {months.map((month) => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="year">Year</label>
              <input
                type="number"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                placeholder="Enter year"
                min="2000"
                max="2100"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="upload">Upload Calendar Image</label>
              <input
                type="file"
                id="upload"
                onChange={handleFileChange}
                accept="image/*"
                className="file-input"
              />
              <label htmlFor="upload" className="file-upload-button">
                Choose File
              </label>
              {selectedFile && <span className="file-name">{selectedFile.name}</span>}
            </div>
            
            {previewImage && (
              <div className="image-preview">
                <img src={previewImage} alt="Preview" />
              </div>
            )}
            
            <button type="submit" className="submit-button">
              Save Calendar
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default HolidayCalendar;