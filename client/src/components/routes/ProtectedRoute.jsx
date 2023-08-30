import { useState, useEffect, Component } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';
import { getCurrentUser } from '../Redux/authActions';

const ProtectedRoute = ({ children }) => {
  const user=useSelector((state)=>state.auth).user
 
  const dispatch=useDispatch();
      const getUser=async()=>{
        try{
         dispatch(getCurrentUser())
        }catch(error){
          localStorage.clear()
        }
       }
       useEffect(() => {
        getUser();
      },[]);
      if (localStorage.getItem("token")) {
        return children;
      } else {
        return <Navigate to="/login" />;
      }
    };




export default ProtectedRoute
