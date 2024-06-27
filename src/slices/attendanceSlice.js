import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/attendance';

export const fetchAttendance = createAsyncThunk(
  'attendance/fetchAttendance',
  async (token, { getState }) => {
    const response = await axios.get(`${API_URL}/getAttendance`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Get users from the state
    const users = getState().users.list;

    // Map attendance records to include user information
    const attendanceRecords = response.data.map(record => {
      const user = users.find(user => user._id === record.userId._id);
      return {
        ...record,
        userId: user ? user : { _id: record.userId._id, name: 'Unknown User' }
      };
    });

    return attendanceRecords;
  }
);

export const markAttendance = createAsyncThunk(
  'attendance/markAttendance',
  async ({ date, status, token }, thunkAPI) => {
    const response = await axios.post(
      `${API_URL}/markAttendance`,
      { date, status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: {
    records: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendance.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAttendance.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.records = action.payload;
      })
      .addCase(fetchAttendance.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(markAttendance.fulfilled, (state, action) => {
        state.records.push(action.payload);
      });
  },
});

export default attendanceSlice.reducer;
