import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Container, Typography, FormControl, InputLabel, Select, MenuItem, TextField, Button, Box, Paper } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateAttendance = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('present');
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`
      };

      axios.get('http://localhost:3001/api/admin/students', { headers })
        .then(response => {
          setUsers(response.data);
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    }
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const headers = {
      Authorization: `Bearer ${token}`
    };

    const data = {
      userId: selectedUser,
      date,
      status
    };

    axios.post('http://localhost:3001/api/attendance/create', data, { headers })
      .then(response => {
        toast.success('Attendance record created successfully');
        setSelectedUser('');
        setDate('');
        setStatus('present');
      })
      .catch(error => {
        console.error('Error creating attendance record:', error);
        toast.error('Error creating attendance record');
      });
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 4 }}>Create Attendance</Typography>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>User</InputLabel>
            <Select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              required
            >
              <MenuItem value=""><em>Select User</em></MenuItem>
              {users.map(user => (
                <MenuItem key={user._id} value={user._id}>{user.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <MenuItem value="present">Present</MenuItem>
              <MenuItem value="absent">Absent</MenuItem>
              <MenuItem value="leave">Leave</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary" fullWidth>Create Attendance</Button>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateAttendance;
