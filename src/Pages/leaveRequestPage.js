import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LeaveRequestPage = () => {
  const [leaves, setLeaves] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2N2IzZDBmODQyMmIwYjhiOTk2NzcxYiIsImVtYWlsIjoiem9oYWliQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzE5MzUyNTkxLCJleHAiOjE3MjAyMTY1OTF9.gH5IJUzCw_DeGc03p6-IsY1Gt3ZlGpp46Z66Cv2x7hA'; // Replace with your actual auth token

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/leaves/getleaves', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLeaves(response.data);
    } catch (error) {
      console.error('Error fetching leaves:', error);
    }
  };

  const handlePostLeave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/leaves/postleave', {
        startDate,
        endDate,
        reason,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('Leave request submitted successfully');
      fetchLeaves();
    } catch (error) {
      setMessage(error.response.data.message || 'An error occurred.');
    }
  };

  return (
    <div>
      <h2>Leave Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave._id}>
              <td>{new Date(leave.startDate).toLocaleDateString()}</td>
              <td>{new Date(leave.endDate).toLocaleDateString()}</td>
              <td>{leave.reason}</td>
              <td>{leave.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <h3>Submit Leave Request</h3>
      <form onSubmit={handlePostLeave}>
        <div>
          <label>Start Date:</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        </div>
        <div>
          <label>End Date:</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
        </div>
        <div>
          <label>Reason:</label>
          <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} required />
        </div>
        <button type="submit">Submit Leave Request</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LeaveRequestPage;
