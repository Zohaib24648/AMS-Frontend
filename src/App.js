import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import SimpleLayout from './components/SimpleLayout';
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
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<SimpleLayout><LoginPage /></SimpleLayout>} />
      <Route path="/register" element={<SimpleLayout><RegisterPage /></SimpleLayout>} />
      <Route
        path="/attendance"
        element={
          <ProtectedRoute allowedRoles={['user', 'admin']}>
            <MainLayout>
              <AttendancePage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/leaves"
        element={
          <ProtectedRoute allowedRoles={['user', 'admin']}>
            <MainLayout>
              <LeaveRequestPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={['user', 'admin']}>
            <MainLayout>
              <UserProfilePage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <MainLayout>
              <AdminDashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/attendance"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <MainLayout>
              <AdminAttendancePage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/create-attendance"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <MainLayout>
              <AdminCreateAttendance />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/leaves"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <MainLayout>
              <LeaveRequests />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/leave-request-history"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <MainLayout>
              <LeaveRequestHistory />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/grade-criteria"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <MainLayout>
              <GradeCriteria />
            </MainLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
