import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";


export const userLogin = createAsyncThunk(
    "/api/v1/auth/login",
    async ({email, password }, { rejectWithValue }) => {
      
      console.log("email and pass in userlogin",email,password)
      try {
        const { data } = await API.post("/api/v1/auth/login", {  email, password });    //response.data
        console.log(data)
        
        //store token
        if (data.token) {
          alert("logged in");
          const userinfo=JSON.stringify(data)
          localStorage.setItem("userinfo",userinfo);  
        }else{
          alert(data.message)
        }
         console.log("the data which is going to be storeed in the store",data)
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
 