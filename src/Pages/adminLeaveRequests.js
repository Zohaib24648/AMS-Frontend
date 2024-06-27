import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Container, Typography, Button, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`
      };

      axios.get('http://localhost:3001/api/leaves/getallleaves', { headers })
        .then(response => {
          setLeaveRequests(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching leave requests:', error);
          toast.error('Error fetching leave requests');
          setLoading(false);
        });
    }
  }, [token]);

  const handleUpdateStatus = (id, status) => {
    const headers = {
      Authorization: `Bearer ${token}`
    };

    axios.patch('http://localhost:3001/api/leaves/updateleavestatus', { id, status }, { headers })
      .then(response => {
        setLeaveRequests(leaveRequests.map(request => request._id === id ? response.data : request));
        toast.success(`Leave request ${status}`);
      })
      .catch(error => {
        console.error(`Error updating leave request status to ${status}:`, error);
        toast.error(`Error updating leave request status to ${status}`);
      });
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 4 }}>Leave Requests</Typography>
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
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaveRequests.filter(request => request.status === 'pending').map(request => (
                  <TableRow key={request._id}>
                    <TableCell>{request.userId ? request.userId.name : 'Unknown User'}</TableCell>
                    <TableCell>{new Date(request.startDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(request.endDate).toLocaleDateString()}</TableCell>
                    <TableCell>{request.reason}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleUpdateStatus(request._id, 'approved')}
                        sx={{ marginRight: 2 }}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleUpdateStatus(request._id, 'rejected')}
                      >
                        Reject
                      </Button>
                    </TableCell>
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

export default LeaveRequests;
