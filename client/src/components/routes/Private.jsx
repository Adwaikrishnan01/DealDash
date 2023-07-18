import { useState, useEffect, Component } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Route, Navigate } from 'react-router-dom';
const PrivateRoute = ({ children }) => {
        console.log("chichi",children)
        const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

        const user = useSelector(state => state.auth).user;
        return user ? 
        children
           : (
            <Navigate to="/login" />
          );
        };
    




export default PrivateRoute
