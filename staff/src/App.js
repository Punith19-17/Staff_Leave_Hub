import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Staff_components/Home';
import Aboutus from './Staff_components/Aboutus';
import Login from './Staff_components/Login';
import ALogin from './admin_components/A_Login';
import Signup from './Staff_components/Signup';
import ASignup from './admin_components/A_Signup';
import Forgotpass from './Staff_components/Forgotpass';
import AForgotpass from './admin_components/A_Forgotpass';
import Dashboard from './Staff_components/Dashboard';
import ADashboard from './admin_components/A_Dashboard';
import EmployeeInfo from './admin_components/EmployeeInfo';
import Apersonalinfo from './admin_components/A_personalinfo';
import Nonteaching from './admin_components/Nonteaching';
import DepartmentMaster from './admin_components/DepartmentMaster';
import Qualification from './Staff_components/qualification';
import Aqualification from './admin_components/A_qualification';
import Aservice from './admin_components/A_service';
import Service from './Staff_components/Service';
import Emppass from './Staff_components/Emppass';
import Profile from './Staff_components/Profile';
import Leave_request from './Staff_components/Leave_request';
import Aleaveapplications from './admin_components/A_leaveapplications';
import Attendance from './admin_components/Attendance';
import Aleavestatus from './admin_components/A_leavestatus';
import Leavestatus from './Staff_components/Leavestatus';
import Leavehystory from './Staff_components/Leavehystory';
import Aholidays from './admin_components/A_holidays';
import Staffholidays from './Staff_components/Staffholidays';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Aboutus" element={<Aboutus />} />
        <Route path="/login" element={<Login />} />
        <Route path="/A_Login" element={<ALogin />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/A_Signup" element={<ASignup />} />
        <Route path="/Forgotpass" element={<Forgotpass />} />
        <Route path="/A_Forgotpass" element={<AForgotpass />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/A_Dashboard" element={<ADashboard />} />
        <Route path="/EmployeeInfo" element={<EmployeeInfo />} />
        <Route path="/A_personalinfo" element={<Apersonalinfo />} />
        <Route path="/Nonteaching" element={<Nonteaching />} />
        <Route path="/DepartmentMaster" element={<DepartmentMaster />} />
        <Route path="/Qualification" element={<Qualification />} />
        <Route path="/A_qualification" element={<Aqualification />} />
        <Route path="/A_service" element={<Aservice />} />
        <Route path="/Service" element={<Service />} />
        <Route path="/Emppass" element={<Emppass />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Leave_request" element={<Leave_request />} />
        <Route path="/A_leaveapplications" element={<Aleaveapplications />} />
        <Route path="/A_leavestatus" element={<Aleavestatus />} />
        <Route path="/Attendance" element={<Attendance />} />
        <Route path="/Leavestatus" element={<Leavestatus />} />
        <Route path="/Leavehystory" element={<Leavehystory />} />
        <Route path="/A_holidays" element={<Aholidays />} />
        <Route path="/Staffholidays" element={<Staffholidays />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;