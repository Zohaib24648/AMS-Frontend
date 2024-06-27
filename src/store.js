import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import attendanceReducer from './slices/attendanceSlice';
import leavesReducer from './slices/leavesSlice';
import usersReducer from './slices/usersSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    attendance: attendanceReducer,
    leaves: leavesReducer,
    users: usersReducer,

  },
});

export default store;
