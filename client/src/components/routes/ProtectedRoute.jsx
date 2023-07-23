import { useState, useEffect, Component } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios'
import { Route, Navigate } from 'react-router-dom';
import { getCurrentUser } from '../Redux/authActions';
const ProtectedRoute = ({ children }) => {
  const dispatch=useDispatch();
        console.log("chichi",children)
       const getUser=async()=>{
        try{
         dispatch(getCurrentUser())
          
          
        }catch(error){
          localStorage.clear()
          console.log("donst know error",error)
        }
       }
       useEffect(() => {
        getUser();
      });
      if (localStorage.getItem("token")) {
        console.log("token in getuser",localStorage.getItem("token"))
        return children;
      } else {
        return <Navigate to="/login" />;
      }
    };




export default ProtectedRoute
