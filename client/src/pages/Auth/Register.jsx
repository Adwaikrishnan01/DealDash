import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import './Auth.scss'
import Layout from '../../components/layout/Layout.jsx';
import { Registeruser } from '../../components/Redux/authActions';
import store from '../../components/Redux/store';


function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
 
  const handleregister = async (e) => {
    e.preventDefault();
    console.log(name, email, password, phone, address);
     try{
      store.dispatch(Registeruser({name, email, password,phone, address ,answer}))
      navigate('/login')
     }catch(error){
      console.log(error)
     }
  };
  return (
    <> <Layout title='Register'>
      <div className='outer-container'><form onSubmit={handleregister}>
        <div className='login-container'>
          <input className='name' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}></input>
          <input className='email' placeholder='Enter the email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
          <input className='password' placeholder='Enter the password' value={password} type='password' onChange={(e) => setPassword(e.target.value)}></input>
          <input className='phone' placeholder='Phone number' value={phone} onChange={(e) => setPhone(e.target.value)}></input>
          <input className='address' placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)}></input>
          <input className='sport' placeholder='Enter your favourite sport' value={answer} onChange={(e) => setAnswer(e.target.value)}></input>
          <button className='button-31' type="submit">Register</button>
        </div></form>
      </div>
    </Layout>
    </>
  );

}

export default Register