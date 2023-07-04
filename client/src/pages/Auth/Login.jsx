import React from 'react'
import { useState } from 'react';
import './Auth.scss'
import Layout from '../../components/layout/Layout.jsx';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


  return (
    <> <Layout title='Login'> 
    <div className='login-container'>
         <input className='email' placeholder='Enter the email' onChange={(e)=>setEmail(e.target.value)}></input>
         <input className='password' placeholder='Enter the password' type='password' onChange={(e)=>setPassword(e.target.value)}></input>
         <button className='login'>Login</button>
         <div className='newaccount'>
        <button>Create new account</button>
    </div>
    </div></Layout>
   

    </>
  )
}

export default Login
