import { createSlice } from '@reduxjs/toolkit';
import {userLogin,getCurrentUser, Registeruser} from './authActions.jsx'
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
    builder.addCase(getCurrentUser.pending,(state)=>{
       state.loading=true;
       state.error=null;
    });
    builder.addCase(getCurrentUser.fulfilled,(state,{payload})=>{
      state.loading=false;
      state.error=null;
      state.user=payload.user;
    });
    builder.addCase(getCurrentUser.rejected,(state,{payload})=>{
      state.error=payload;
      state.loading=false;
    })
    builder.addCase(Registeruser.pending,(state)=>{
      state.loading=true;
      state.error=null;
   });
   builder.addCase(Registeruser.rejected,(state,{payload})=>{
    state.error=payload;
    state.loading=false;
  })
}
});
//  export const searchSlice=createSlice({
//   name:'search',
//   initialState:{
//     searchedList:"term"
//   }

//  })

export const { userLogout} = authSlice.actions;
export default authSlice.reducer;
