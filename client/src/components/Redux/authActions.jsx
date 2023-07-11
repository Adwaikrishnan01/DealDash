import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";


export const userLogin = createAsyncThunk(
    "/api/v1/auth/login",
    async ({email, password }, { rejectWithValue }) => {
      console.log("email and pass in userlogin",email,password)
      try {
        const { data } = await API.post("/api/v1/auth/login", {  email, password });    //response.data
        console.log(data)
        //store token
        if (data.token) {
          alert(data.message);
          localStorage.setItem("token", data.token);
          window.location.replace("/");
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