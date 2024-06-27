import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const LeaveRequestHistory = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
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
    }
  }, [token]);

  return (
    <div>
      <h1>Leave Request History</h1>
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
