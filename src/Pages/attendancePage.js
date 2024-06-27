import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAttendance, markAttendance } from '../slices/attendanceSlice';

const AttendancePage = () => {
  const dispatch = useDispatch();
  const attendance = useSelector((state) => state.attendance.records);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchAttendance(token));
    }
  }, [token, dispatch]);

  const handleMarkAttendance = (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().split('T')[0];
    dispatch(markAttendance({ date: currentDate, status: 'present', token }));
  };

  return (
    <div>
      <h2>Attendance Records</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((record) => (
            <tr key={record._id}>
              <td>{new Date(record.date).toLocaleDateString()}</td>
              <td>{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Mark Attendance</h3>
      <button onClick={handleMarkAttendance}>Mark Present</button>
    </div>
  );
};

export default AttendancePage;
