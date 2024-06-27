import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Typography, Button, Box, Paper, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from '@mui/material';

const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [usersPresentToday, setUsersPresentToday] = useState(0);
  const [usersAbsentToday, setUsersAbsentToday] = useState(0);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [showAttendance, setShowAttendance] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
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
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching attendance records:', error);
          setLoading(false);
        });
    }
  }, [token]);

  const handleShowAttendance = () => {
    setShowAttendance(!showAttendance);
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 4 }}>Admin Dashboard</Typography>
      <Paper elevation={3} sx={{ padding: 4, marginBottom: 4 }}>
        <Typography variant="h6">Overview</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          <Typography variant="body1">Total Users: {totalUsers}</Typography>
          <Typography variant="body1">Users Present Today: {usersPresentToday}</Typography>
          <Typography variant="body1">Users Absent Today: {usersAbsentToday}</Typography>
        </Box>
      </Paper>
      <Button variant="contained" color="primary" onClick={handleShowAttendance} sx={{ marginBottom: 4 }}>
        {showAttendance ? 'Hide' : 'Show'} Today's Attendance
      </Button>
      {showAttendance && (
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>Today's Attendance</Typography>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 100 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attendanceRecords.filter(record => {
                    const recordDate = new Date(record.date);
                    return recordDate.toDateString() === new Date().toDateString();
                  }).map(record => (
                    <TableRow key={record._id}>
                      <TableCell>{record.userId.name}</TableCell>
                      <TableCell>{record.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      )}
    </Container>
  );
};

export default AdminDashboard;
