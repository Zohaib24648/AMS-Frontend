import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/leaves';

export const fetchLeaves = createAsyncThunk(
  'leaves/fetchLeaves',
  async (token, thunkAPI) => {
    const response = await axios.get(`${API_URL}/getleaves`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const postLeave = createAsyncThunk(
  'leaves/postLeave',
  async ({ startDate, endDate, reason, token }, thunkAPI) => {
    const response = await axios.post(
      `${API_URL}/postleave`,
      { startDate, endDate, reason },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

const leavesSlice = createSlice({
  name: 'leaves',
  initialState: {
    requests: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaves.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLeaves.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.requests = action.payload;
      })
      .addCase(fetchLeaves.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(postLeave.fulfilled, (state, action) => {
        state.requests.push(action.payload);
      });
  },
});

export default leavesSlice.reducer;
