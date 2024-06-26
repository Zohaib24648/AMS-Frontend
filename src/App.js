import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/loginPage';
import RegisterPage from './Pages/registerPage';
import AttendancePage from './Pages/attendancePage';
import LeaveRequestPage from './Pages/leaveRequestPage';
import UserProfilePage from './Pages/userProfilePage';
import AdminDashboard from './Pages/adminDashboard';
import AdminAttendancePage from './Pages/adminAttendancePage';
import AdminCreateAttendance from './Pages/adminCreateAttendance';
import LeaveRequests from './Pages/adminLeaveRequests';
import LeaveRequestHistory from './Pages/adminLeaveRequestHistory';
import GradeCriteria from './Pages/adminGradeCriteria';



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
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/attendance" element={<AdminAttendancePage />} />
          <Route path="/admin/create-attendance" element={<AdminCreateAttendance />} />
          <Route path="/admin/leaves" element={<LeaveRequests />} />
          <Route path="/admin/leave-request-history" element={<LeaveRequestHistory />} />
          <Route path="/admin/grade-criteria" element={<GradeCriteria />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
