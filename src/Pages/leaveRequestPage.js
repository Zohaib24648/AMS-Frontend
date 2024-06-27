import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaves, postLeave } from '../slices/leavesSlice';

const LeaveRequestPage = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const leaves = useSelector((state) => state.leaves.requests);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchLeaves(token));
    }
  }, [token, dispatch]);

  const handlePostLeave = async (e) => {
    e.preventDefault();
    try {
      await dispatch(postLeave({ startDate, endDate, reason, token }));
      setMessage('Leave request submitted successfully');
      dispatch(fetchLeaves(token));
    } catch (error) {
      setMessage('An error occurred.');
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
