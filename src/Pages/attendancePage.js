import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAttendance, markAttendance } from '../slices/attendanceSlice';
import { CircularProgress, Typography, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, LinearProgress } from '@mui/material';
import { toast } from 'react-toastify';

const AttendancePage = () => {
  const dispatch = useDispatch();
  const attendance = useSelector((state) => state.attendance.records);
  const token = useSelector((state) => state.auth.token);
  const error = useSelector((state) => state.attendance.error);

  useEffect(() => {
    if (token) {
      dispatch(fetchAttendance(token));
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleMarkAttendance = async (e) => {
    e.preventDefault();
    try {
      const now = new Date();
      const currentDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())).toISOString().split('T')[0];
      await dispatch(markAttendance({ date: currentDate, status: 'present', token })).unwrap();
      toast.success('Attendance marked as present');
    } catch (error) {
      console.error("Failed to mark attendance", error);
      toast.error("Failed to mark attendance. Please try again.");
    }
  };

  const attendanceByMonth = useMemo(() => {
    const grouped = {};
    const sortedAttendance = [...attendance].sort((a, b) => new Date(b.date) - new Date(a.date));

    sortedAttendance.forEach(record => {
      const date = new Date(record.date);
      const month = date.getUTCMonth() + 1; // JavaScript months are 0-11, use UTC
      const year = date.getUTCFullYear(); // Use UTC
      const key = `${year}-${month}`;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(record);
    });
    return grouped;
  }, [attendance]);

  const calculatePercentage = (records) => {
    const presentDays = records.filter(record => record.status === 'present').length;
    const validDays = records.filter(record => record.status !== 'leave').length;
    return validDays > 0 ? (presentDays / validDays) * 100 : 0;
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <Typography variant="h4">Attendance Records</Typography>
        <Button variant="contained" color="primary" onClick={handleMarkAttendance}>Mark Present</Button>
      </Box>

      {Object.keys(attendanceByMonth).map(month => {
        const monthYear = new Date(`${month}-01`).toLocaleDateString('default', { month: 'long', year: 'numeric' });
        const percentage = calculatePercentage(attendanceByMonth[month]);

        return (
          <Box key={month} sx={{ marginBottom: 4 }}>
            <Typography variant="h6">{monthYear}</Typography>
            <LinearProgress variant="determinate" value={percentage} sx={{ height: 10, marginBottom: 2 }} />
            <Typography variant="body2" sx={{ marginBottom: 2 }}>{`Attendance: ${percentage.toFixed(2)}%`}</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attendanceByMonth[month].map(record => (
                    <TableRow key={record._id}>
                      <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                      <TableCell>{record.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        );
      })}
    </Container>
  );
};

export default AttendancePage;
