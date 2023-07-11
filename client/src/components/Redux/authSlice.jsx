import { createSlice } from '@reduxjs/toolkit';
const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    token,
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
  },
});

export const { loginSuccess, loginFailure } = authSlice.actions;
export default authSlice.reducer;