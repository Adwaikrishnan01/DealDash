import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";


export const userLogin = createAsyncThunk(
    "/api/v1/auth/login",
    async ({email, password }, { rejectWithValue }) => {
      
      console.log("email and pass in userlogin",email,password)
      try {
        const { data } = await API.post("/api/v1/auth/login", {  email, password });    
    
        
        //store token
        if (data.token) {
          alert("logged in");
          localStorage.setItem("token", data.token);
           //store.dispatch(getCurrentUser())
        }else{
          alert("Error in logging in")
        }
        
          return data;
      } catch (error) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  );
   export const getCurrentUser=createAsyncThunk('user/getCurrentUser',async(_,{rejectWithValue})=>{
        try{
          const {data}=await API.get('/api/v1/auth/currentuser')
         
          if(data)
           return data;
        }catch(error){
        
          if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
          } else {
            return rejectWithValue(error.message);
          }
        }
   })
   export const Registeruser=createAsyncThunk('auth/RegisterUser',async( {name, email, password,phone, address ,answer},{rejectWithValue})=>{
    try{
            const {data}=await API.post('/api/v1/auth/register',{name, email, password,phone, address ,answer})
              if(data.success){
                alert("user registerd successfully!!!!!")
              }
    }catch(error){
    
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
   })
 