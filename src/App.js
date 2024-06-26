import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/loginPage';
import RegisterPage from './Pages/registerPage';
import AttendancePage from './Pages/attendancePage';
import LeaveRequestPage from './Pages/leaveRequestPage';
import UserProfilePage from './Pages/userProfilePage';




const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/leaves" element={<LeaveRequestPage />} />
          <Route path="/profile" element={<UserProfilePage />} />


        </Routes>
      </div>
    </Router>
  );
};

export default App;
