import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchUsers } from '../slices/usersSlice';
import { Typography, Box, Button, TextField, Select, MenuItem, FormControl, InputLabel, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';

const AttendanceRange = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [editRecord, setEditRecord] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const users = useSelector((state) => state.users.list);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchUsers(token));
    }
  }, [token, dispatch]);

  const handleFetchAttendance = () => {
    setLoading(true);
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const params = {
      startDate,
      endDate,
    };

    if (selectedUser) {
      params.userId = selectedUser;
    }

    axios
      .get('http://localhost:3001/api/attendance/report', { headers, params })
      .then((response) => {
        setAttendanceRecords(response.data.sort((a, b) => new Date(b.date) - new Date(a.date)));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching attendance records:', error);
        toast.error('Error fetching attendance records');
        setLoading(false);
      });
  };

  const handleUpdateAttendance = (id) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .put(
        'http://localhost:3001/api/attendance/update',
        {
          id,
          status: newStatus,
        },
        { headers }
      )
      .then((response) => {
        setAttendanceRecords(
          attendanceRecords.map((record) =>
            record._id === id ? response.data : record
          )
        );
        setEditRecord(null);
        setNewStatus('');
        toast.success('Attendance record updated successfully');
      })
      .catch((error) => {
        console.error('Error updating attendance record:', error);
        toast.error('Error updating attendance record');
      });
  };

  const handleDeleteAttendance = (id) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .delete(`http://localhost:3001/api/attendance/delete/${id}`, { headers })
      .then(() => {
        setAttendanceRecords(
          attendanceRecords.filter((record) => record._id !== id)
        );
        toast.success('Attendance record deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting attendance record:', error);
        toast.error('Error deleting attendance record');
      });
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 4 }}>Attendance Records</Typography>
      <Paper elevation={3} sx={{ padding: 4, marginBottom: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ marginRight: 2 }}
          />
          <TextField
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ marginRight: 2 }}
          />
          <FormControl sx={{ minWidth: 150, marginRight: 2 }}>
            <InputLabel id="user-select-label">User</InputLabel>
            <Select
              labelId="user-select-label"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              label="User"
            >
              <MenuItem value=""><em>All Users</em></MenuItem>
              {users.map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleFetchAttendance}>
            Fetch Attendance
          </Button>
        </Box>
      </Paper>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 100 }}>
          <CircularProgress />
        </Box>
      ) : (
        attendanceRecords.length > 0 && (
          <Paper elevation={3} sx={{ padding: 4 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Attendance from {startDate} to {endDate}
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attendanceRecords.map((record) => (
                    <TableRow key={record._id}>
                      <TableCell>{record.userId.name}</TableCell>
                      <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                      <TableCell>{record.status}</TableCell>
                      <TableCell>
                        {editRecord === record._id ? (
                          <>
                            <FormControl sx={{ minWidth: 100, marginRight: 2 }}>
                              <Select
                                value={newStatus}
                                onChange={(e) => setNewStatus(e.target.value)}
                                displayEmpty
                              >
                                <MenuItem value="">Select Status</MenuItem>
                                <MenuItem value="present">Present</MenuItem>
                                <MenuItem value="absent">Absent</MenuItem>
                                <MenuItem value="leave">Leave</MenuItem>
                              </Select>
                            </FormControl>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleUpdateAttendance(record._id)}
                              sx={{ marginRight: 2 }}
                            >
                              Update
                            </Button>
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => setEditRecord(null)}
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={() => {
                                setEditRecord(record._id);
                                setNewStatus(record.status);
                              }}
                              sx={{ marginRight: 2 }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outlined"
                              color="secondary"
                              onClick={() => handleDeleteAttendance(record._id)}
                            >
                              Delete
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )
      )}
    </Container>
  );
};

export default AttendanceRange;
