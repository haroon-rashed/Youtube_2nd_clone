

import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';

export const store = configureStore({
  reducer: {
    auth: userSlice, 
  },
  devTools: process.env.NODE_ENV !== 'production',
});
