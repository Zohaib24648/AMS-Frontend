import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Box, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LeaveRequestHistory = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`
      };

      axios.get('http://localhost:3001/api/leaves/getallleaves', { headers })
        .then(response => {
          const sortedRequests = response.data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
          setLeaveRequests(sortedRequests);
          setFilteredRequests(sortedRequests);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching leave requests:', error);
          toast.error('Error fetching leave requests');
          setLoading(false);
        });
    }
  }, [token]);

  const uniqueUsers = [...new Set(leaveRequests.map(request => request.userId && request.userId._id))].map(userId => {
    return leaveRequests.find(request => request.userId && request.userId._id === userId)?.userId;
  }).filter(Boolean);

  const handleFilter = () => {
    let filtered = leaveRequests;
    if (startDate) {
      filtered = filtered.filter(request => new Date(request.startDate) >= new Date(startDate));
    }
    if (endDate) {
      filtered = filtered.filter(request => new Date(request.endDate) <= new Date(endDate));
    }
    if (selectedUser) {
      filtered = filtered.filter(request => request.userId && request.userId._id === selectedUser);
    }
    setFilteredRequests(filtered);
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 4 }}>Leave Request History</Typography>
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
              {uniqueUsers.map(user => (
                <MenuItem key={user._id} value={user._id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleFilter}>Filter</Button>
        </Box>
      </Paper>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 100 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper elevation={3} sx={{ padding: 4 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRequests.filter(request => request.status !== 'pending').map(request => (
                  <TableRow key={request._id}>
                    <TableCell>{request.userId ? request.userId.name : 'Unknown User'}</TableCell>
                    <TableCell>{new Date(request.startDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(request.endDate).toLocaleDateString()}</TableCell>
                    <TableCell>{request.reason}</TableCell>
                    <TableCell>{request.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Container>
  );
};

export default LeaveRequestHistory;
