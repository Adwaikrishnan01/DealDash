import React from 'react'
import Layout from '../components/layout/Layout'
const Homepage = () => {
  const token=localStorage.getItem("token")
  console.log("homepage token",token)
  return (
    <Layout title={'DealDash-home'}>
        <div>Homepage</div> {token}</Layout>
       
  )
}

export default Homepage