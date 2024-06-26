import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LeaveRequestHistory = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [message, setMessage] = useState('');

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2N2M4OTE4ODlmNjhlZDdhMWU0OTY1YyIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzE5NDM3Njk3LCJleHAiOjE3MjAzMDE2OTd9.AnTY_MvVOJpsGWywpB7cp_hgSkJkNklggMHZPIRjulA';

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`
    };

    axios.get('http://localhost:3001/api/leaves/getallleaves', { headers })
      .then(response => {
        setLeaveRequests(response.data);
      })
      .catch(error => {
        console.error('Error fetching leave requests:', error);
      });
  }, []);

  return (
    <div>
      <h1>Leave Request History</h1>
      {message && <p>{message}</p>}
      <ul>
        {leaveRequests.filter(request => request.status !== 'pending').map(request => (
          <li key={request._id}>
            {request.userId ? `${request.userId.name}` : 'Unknown User'}: {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()} ({request.reason})
            - Status: {request.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaveRequestHistory;
