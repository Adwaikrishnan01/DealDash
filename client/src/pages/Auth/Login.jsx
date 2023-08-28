import React from 'react'
import { useState } from 'react';
import {useSelector,useDispatch} from 'react-redux'
import Spinner from 'react-bootstrap/Spinner';
import { getCurrentUser, userLogin } from '../../components/Redux/authActions';
import store from '../../components/Redux/store';
import './Auth.scss'
import Layout from '../../components/layout/Layout.jsx';
import { useNavigate ,Link} from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate=useNavigate();
    const {error,user} = useSelector((state) => state.auth);
    const auth=useSelector(state=>state.auth)

    const handleLogin = (e) => { 
      e.preventDefault();
     console.log("entereed mail password are",email,password)
      try {
        
        if (!email || !password) {
          return alert("Please Provide All Fields");
        }
        store.dispatch(userLogin({ email, password}));
        if(auth.loading){
          <Spinner/>}
          
        if(auth.loading===false && user?.role===0){
        navigate('/')
      }
         if(auth.loading===false && user?.role===1){
        navigate('/admindashboard')
      
       }
        
       if(error){
        alert("Error in loggin in")
       }
         
        
       
        
      } catch (error) {
       console.log("storeerror",error)
      }
    };
  return (
    <> <Layout title='Login'> 
    <div className='outer-container'><form>
    <div className='login-container'>
      <input className='email' placeholder='Enter the email' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
         <input className='password' placeholder='Enter the password' type='password' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
         <button className='button-31' type='submit' onClick={handleLogin}>Login</button>
         <p class="small mb-5 pb-lg-2"><Link to="/forgotpassword"  style={{ textDecoration: 'none' }}>Forgot password?</Link></p>
         
         <p className="text-dark-50 fw-bold">Don't have an account? <Link to="/register" style={{ textDecoration: 'none' }}>
        Register here
      </Link></p>
            
         
    </div></form></div></Layout>
   

    </>
  )
}

export default Login
