// src/slices/attendanceSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/attendance';

export const fetchAttendance = createAsyncThunk(
  'attendance/fetchAttendance',
  async (token) => {
    const response = await axios.get(`${API_URL}/getAttendance`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const markAttendance = createAsyncThunk(
  'attendance/markAttendance',
  async ({ date, status, token }, thunkAPI) => {
    try {
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
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue(error.message);
    }
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
      })
      .addCase(markAttendance.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  },
});

export default attendanceSlice.reducer;
