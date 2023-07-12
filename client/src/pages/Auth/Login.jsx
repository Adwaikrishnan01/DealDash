import React from 'react'
import { useState } from 'react';
import {useSelector,useDispatch} from 'react-redux'
import { userLogin } from '../../components/Redux/authActions';
import store from '../../components/Redux/store';
import './Auth.scss'
import Layout from '../../components/layout/Layout.jsx';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const error = useSelector((state) => state.auth.error);
    
    const handleLogin = (e) => { 
      e.preventDefault();
     console.log("entereed mail password are",email,password)
      try {
        
        if (!email || !password) {
          return alert("Please Provide All Fields");
        }
        store.dispatch(userLogin({ email, password }));
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <> <Layout title='Login'> 
    <main><form>
    <div className='login-container'>
      <input className='email' placeholder='Enter the email' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
         <input className='password' placeholder='Enter the password' type='password' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
         <button className='login' typpe='submit' onClick={handleLogin}>Login</button>
         
    </div></form></main></Layout>
   

    </>
  )
}

export default Login
