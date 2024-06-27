import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  role: localStorage.getItem('role') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.role;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('role', action.payload.role);
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
