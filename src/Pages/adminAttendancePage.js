import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AttendanceRange = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [editRecord, setEditRecord] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

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

  const handleFetchAttendance = () => {
    const headers = {
      Authorization: `Bearer ${token}`
    };

    const params = {
      startDate,
      endDate
    };

    if (selectedUser) {
      params.userId = selectedUser;
    }

    axios.get('http://localhost:3001/api/attendance/report', { headers, params })
      .then(response => {
        setAttendanceRecords(response.data);
      })
      .catch(error => {
        console.error('Error fetching attendance records:', error);
      });
  };

  const handleUpdateAttendance = (id) => {
    const headers = {
      Authorization: `Bearer ${token}`
    };

    axios.put('http://localhost:3001/api/attendance/update', {
      id,
      status: newStatus
    }, { headers })
      .then(response => {
        setAttendanceRecords(attendanceRecords.map(record => record._id === id ? response.data : record));
        setEditRecord(null);
        setNewStatus('');
      })
      .catch(error => {
        console.error('Error updating attendance record:', error);
      });
  };

  const handleDeleteAttendance = (id) => {
    const headers = {
      Authorization: `Bearer ${token}`
    };

    axios.delete(`http://localhost:3001/api/attendance/delete/${id}`, { headers })
      .then(() => {
        setAttendanceRecords(attendanceRecords.filter(record => record._id !== id));
      })
      .catch(error => {
        console.error('Error deleting attendance record:', error);
      });
  };

  return (
    <div>
      <h1>Attendance Records</h1>
      <div>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <label>
          User (optional):
          <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
            <option value="">All Users</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>{user.name}</option>
            ))}
          </select>
        </label>
        <button onClick={handleFetchAttendance}>Fetch Attendance</button>
      </div>
      {attendanceRecords.length > 0 && (
        <div>
          <h2>Attendance from {startDate} to {endDate}</h2>
          <ul>
            {attendanceRecords.map(record => (
              <li key={record._id}>
                {record.userId ? `${record.userId.name} - ${new Date(record.date).toLocaleDateString()} - ${record.status}` : 'Unknown User'}
                {editRecord === record._id ? (
                  <>
                    <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                      <option value="">Select Status</option>
                      <option value="present">Present</option>
                      <option value="absent">Absent</option>
                      <option value="leave">Leave</option>
                    </select>
                    <button onClick={() => handleUpdateAttendance(record._id)}>Update</button>
                    <button onClick={() => setEditRecord(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => { setEditRecord(record._id); setNewStatus(record.status); }}>Edit</button>
                    <button onClick={() => handleDeleteAttendance(record._id)}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AttendanceRange;
