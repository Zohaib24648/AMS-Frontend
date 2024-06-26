import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CreateAttendance = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('present');
  const [message, setMessage] = useState('');

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2N2M4OTE4ODlmNjhlZDdhMWU0OTY1YyIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzE5NDM3Njk3LCJleHAiOjE3MjAzMDE2OTd9.AnTY_MvVOJpsGWywpB7cp_hgSkJkNklggMHZPIRjulA';

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`
    };

    axios.get('http://localhost:3001/api/admin/students', { headers })
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const headers = {
      Authorization: `Bearer ${token}`
    };

    const data = {
      userId: selectedUser,
      date,
      status
    };

    axios.post('http://localhost:3001/api/attendance/create', data, { headers })
      .then(response => {
        setMessage('Attendance record created successfully');
        setSelectedUser('');
        setDate('');
        setStatus('present');
      })
      .catch(error => {
        console.error('Error creating attendance record:', error);
        setMessage('Error creating attendance record');
      });
  };

  return (
    <div>
      <h1>Create Attendance</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User:</label>
          <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} required>
            <option value="">Select User</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>{user.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="leave">Leave</option>
          </select>
        </div>
        <button type="submit">Create Attendance</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateAttendance;
