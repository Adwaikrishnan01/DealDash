import React from 'react'
import {useEffect,useState} from 'react'
import Layout from '../components/layout/Layout'
import { useSelector } from 'react-redux'

const Homepage = () => {
  const user=useSelector((state)=>state.auth)
  console.log("selector working",user)
//   const [userdata,setuserData]=useState({user:null,token:''})
//   useEffect(() => {
//       const userinfo=localStorage.getItem("userinfo")
//       const text=JSON.parse(userinfo)
//       setuserData((prevUserData) => ({
//         ...prevUserData,
//         user: text.user,
//         token: text.token
//       }));
//     },[])
// console.log("userdata",userdata);
  
  return (
    <Layout title={'DealDash-home'}>
        <div>Homepage
        </div><div></div></Layout>
       
  )
}

export default Homepage