import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import turnSlice from './slices/turnSlice';
import userSlice from './slices/userSlice';


export const store = configureStore({
  reducer: {
    authh: authSlice,
    user: userSlice,
    turn: turnSlice
  },
});
