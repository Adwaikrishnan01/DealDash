import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import './Auth.scss'
import Layout from '../../components/layout/Layout.jsx';


function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleregrister = async (e) => {
    e.preventDefault();
    console.log(name, email, password, phone, address);
    
    try {
      const res = await axios.post(`${import.meta.env.VITE_APP_API}/api/v1/auth/register`, { 
        name, email, password,phone, address 
      });
      if (res &&res.status===201) {
        console.log("response data",res.data);
        alert("User is registered please login");
        navigate('/login');
      } 
    } catch (error) {
    if(error.request.status===400){
      alert("user with email already regristerd")
    }
    }
  };
  return (
    <> <Layout title='Register'>
      <main><form onSubmit={handleregrister}>
        <div className='login-container'>
          <input className='name' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}></input>
          <input className='email' placeholder='Enter the email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
          <input className='password' placeholder='Enter the password' value={password} type='password' onChange={(e) => setPassword(e.target.value)}></input>
          <input className='phone' placeholder='Phone number' value={phone} onChange={(e) => setPhone(e.target.value)}></input>
          <input className='address' placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)}></input>
          <button className='register' type="submit">Register</button>
        </div></form>
      </main>
    </Layout>
    </>
  );

}

export default Register