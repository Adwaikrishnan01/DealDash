import React from 'react'
import { useState } from 'react';
import axios from 'axios'
// import {useSelector,useDispatch} from 'react-redux'
// import { userLogin } from '../../components/Redux/authActions';
// import store from '../../components/Redux/store';
import './Auth.scss'
import Layout from '../../components/layout/Layout.jsx';
import { useNavigate } from 'react-router-dom';

const Forgotpassword = () => {
    const [newPassword, setPassword] = useState('');
    const [email,setEmail]=useState("")
    const [answer,setAnswer]=useState("")
    const navigate=useNavigate();
    const handleSubmit = async(e) => { 
      e.preventDefault();
        if (!email || !newPassword || !answer) {
          return alert("Please Provide All Fields");
        }
         try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API}/api/v1/auth/forgotpassword`, { 
            email, newPassword,answer
            });
            if (res &&res.status===200) {
              console.log("response data",res.data);
              alert("password changed successfully!!!");
              navigate('/login');
            } 
          } catch (error) {
         console.log(error);
         alert("Something went wrong")
          }
        
    };
  return (
    <> <Layout title='Login'> 
    <main><form>
    <div className='login-container'>
      <input className='email' placeholder='Enter the email' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
      <input className='email' placeholder='Enter your favourite sport' value={answer} onChange={(e)=>setAnswer(e.target.value)}></input>
         <input className='password' placeholder='Enter the new password' type='password' value={newPassword} onChange={(e)=>setPassword(e.target.value)}></input>
         <button className='login' typpe='submit' onClick={handleSubmit}>Change password</button>
         
    </div></form></main></Layout>
   

    </>
  )
}

export default Forgotpassword;