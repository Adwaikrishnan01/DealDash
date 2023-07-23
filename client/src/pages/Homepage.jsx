import React from 'react'
import {useEffect,useState} from 'react'
import Layout from '../components/layout/Layout'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';
const Homepage = () => {
  const {loading,error,user}=useSelector((state)=>state.auth)
  const navigate=useNavigate()
  console.log("selector working",user)
 
  
  return (
    <Layout title={'DealDash-home'}>

        {user?.role===1 && navigate('/admindashboard')}
        {error && <span>{alert(error)}</span>}
        {loading? (<Spinner/>):(
                <div>Homepage</div>
        )}
        <div></div>
    </Layout>   
  )
}

export default Homepage