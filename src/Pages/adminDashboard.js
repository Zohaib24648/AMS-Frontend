import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [usersPresentToday, setUsersPresentToday] = useState(0);
  const [usersAbsentToday, setUsersAbsentToday] = useState(0);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [showAttendance, setShowAttendance] = useState(false);

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2N2M4OTE4ODlmNjhlZDdhMWU0OTY1YyIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzE5NDM3Njk3LCJleHAiOjE3MjAzMDE2OTd9.AnTY_MvVOJpsGWywpB7cp_hgSkJkNklggMHZPIRjulA';

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`
    };

    // Fetch total users
    axios.get('http://localhost:3001/api/admin/count', { headers })
      .then(response => {
        setTotalUsers(response.data.totalUsers);
      })
      .catch(error => {
        console.error('Error fetching total users:', error);
      });

    // Fetch today's attendance records
    axios.get('http://localhost:3001/api/attendance/all', { headers })
      .then(response => {
        const today = new Date();
        const present = response.data.filter(record => {
          const recordDate = new Date(record.date);
          return recordDate.toDateString() === today.toDateString() && record.status === 'present';
        }).length;
        const absent = response.data.filter(record => {
          const recordDate = new Date(record.date);
          return recordDate.toDateString() === today.toDateString() && record.status === 'absent';
        }).length;

        setUsersPresentToday(present);
        setUsersAbsentToday(absent);
        setAttendanceRecords(response.data);
      })
      .catch(error => {
        console.error('Error fetching attendance records:', error);
      });
  }, []);

  const handleShowAttendance = () => {
    setShowAttendance(!showAttendance);
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <p>Total Users: {totalUsers}</p>
        <p>Users Present Today: {usersPresentToday}</p>
        <p>Users Absent Today: {usersAbsentToday}</p>
      </div>
      <button onClick={handleShowAttendance}>
        {showAttendance ? 'Hide' : 'Show'} Today's Attendance
      </button>
      {showAttendance && (
        <div>
          <h2>Today's Attendance</h2>
          <ul>
            {attendanceRecords.filter(record => {
              const recordDate = new Date(record.date);
              return recordDate.toDateString() === new Date().toDateString();
            }).map(record => (
              <li key={record._id}>
                {record.userId.name} - {record.status}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
