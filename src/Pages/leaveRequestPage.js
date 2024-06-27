import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaves, postLeave } from '../slices/leavesSlice';
import { TextField, Button, Typography, Container, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LeaveRequestPage = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const dispatch = useDispatch();
  const leaves = useSelector((state) => state.leaves.requests);
  const token = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.leaves.loading);
  const error = useSelector((state) => state.leaves.error);

  useEffect(() => {
    if (token) {
      dispatch(fetchLeaves(token));
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handlePostLeave = async (e) => {
    e.preventDefault();
    try {
      await dispatch(postLeave({ startDate, endDate, reason, token })).unwrap();
      toast.success('Leave request submitted successfully');
      dispatch(fetchLeaves(token));
      setStartDate('');
      setEndDate('');
      setReason('');
    } catch (error) {
      toast.error('An error occurred.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <Typography variant="h4">Leave Requests</Typography>
      </Box>

      <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              leaves.map((leave) => (
                <TableRow key={leave._id}>
                  <TableCell>{new Date(leave.startDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(leave.endDate).toLocaleDateString()}</TableCell>
                  <TableCell>{leave.reason}</TableCell>
                  <TableCell>{leave.status}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box component="form" onSubmit={handlePostLeave} sx={{ marginBottom: 4 }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>Submit Leave Request</Typography>
        <TextField
          fullWidth
          variant="outlined"
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" color="primary" type="submit">Submit Leave Request</Button>
      </Box>
    </Container>
  );
};

export default LeaveRequestPage;
