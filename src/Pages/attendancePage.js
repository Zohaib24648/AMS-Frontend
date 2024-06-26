import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttendancePage = () => {
  const [attendance, setAttendance] = useState([]);
  const [message, setMessage] = useState('');
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2N2IzZDBmODQyMmIwYjhiOTk2NzcxYiIsImVtYWlsIjoiem9oYWliQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzE5MzUyNTkxLCJleHAiOjE3MjAyMTY1OTF9.gH5IJUzCw_DeGc03p6-IsY1Gt3ZlGpp46Z66Cv2x7hA'; // Replace with your actual auth token

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/attendance/getAttendance', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAttendance(response.data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  const handleMarkAttendance = async (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().split('T')[0];
    const status = 'present';
    try {
      const response = await axios.post('http://localhost:3001/api/attendance/markAttendance', {
        date: currentDate,
        status,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('Attendance marked successfully');
      fetchAttendance();
    } catch (error) {
      setMessage(error.response.data.message || 'An error occurred.');
    }
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
      {message && <p>{message}</p>}
    </div>
  );
};

export default AttendancePage;
