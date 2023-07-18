import { createSlice } from '@reduxjs/toolkit';
import {userLogin} from './authActions.jsx'
const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
   
    user: null,
    token,
    error: null,
  },
  reducers: {
    userLogout:(state)=>{
      state.user = null;
      state.token = '';
      state.isAuthenticated=false;
      localStorage.clear()
    }
  },
  extraReducers: (builder) => {
    // login user
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload.user;
      state.token = payload.token;
     
    });
    builder.addCase(userLogin.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      
    });
}
});

export const { userLogout} = authSlice.actions;
export default authSlice.reducer;