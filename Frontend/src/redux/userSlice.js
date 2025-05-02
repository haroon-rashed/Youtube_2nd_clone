

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signupUser, loginUser, verifyUser } from './userService';


export const signupUserAsync = createAsyncThunk(
  'user/signup',
  async (userData, thunkAPI) => {
    try {
      return await signupUser(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Signup failed');
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  'user/login',
  async (userData, thunkAPI) => {
    try {
      return await loginUser(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);



export const verifyUserAsync = createAsyncThunk(
  'user/verifyUser',
  async (userData, thunkAPI) => {
    try {
      return await verifyUser(userData); 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Verification failed');
    }
  }
);


const userSlice = createSlice({
  name: 'auth', 
  initialState: {
    user: null,
    token: null,
    loading: false,
    userError: false,
    userSuccess: false,
    userMessage: '',
  },
  reducers: {
    resetUser: (state) => {
      state.userError = false;
      state.userSuccess = false;
      state.userMessage = '';
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signupUserAsync.pending, (state) => {
      state.loading = true;
      state.userError = false;
      state.userSuccess = false;
    });

    builder.addCase(signupUserAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.userSuccess = true;
      state.user = { user_id: action.payload.user_id };
      state.token = null;
      state.userMessage = action.payload.message || 'Signup successful';
    });

    builder.addCase(signupUserAsync.rejected, (state, action) => {
      state.loading = false;
      state.userError = true;
      state.userMessage = action.payload || 'Signup failed';
    });

    builder.addCase(loginUserAsync.pending, (state) => {
      state.loading = true;
      state.userError = false;
      state.userSuccess = false;
    });

    builder.addCase(loginUserAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.userSuccess = true;
      state.user = action.payload.user || null;
      state.token = action.payload.token || null;
      state.userMessage = action.payload.message || 'Login successful';
    });

    builder.addCase(loginUserAsync.rejected, (state, action) => {
      state.loading = false;
      state.userError = true;
      state.userMessage = action.payload || 'Login failed';
    });

    builder.addCase(verifyUserAsync.pending, (state) => {
      state.loading = true;
      state.userError = false;
      state.userSuccess = false;
      state.userMessage = 'Verifying...';
    });

    builder.addCase(verifyUserAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.userSuccess = true;
      state.user = action.payload.user || state.user;
      state.token = action.payload.token || state.token;
      state.userMessage = action.payload.message || 'User verified successfully';
    });

    builder.addCase(verifyUserAsync.rejected, (state, action) => {
      state.loading = false;
      state.userError = true;
      state.userMessage = action.payload || 'Verification failed';
    });
  },
});

export const { resetUser } = userSlice.actions;
export default userSlice.reducer;
