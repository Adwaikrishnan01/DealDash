import React from 'react'
import Layout from '../../components/layout/Layout'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import { useNavigate } from 'react-router-dom';
import './admin.scss'
const AdminDashboard = () => {
  const navigate=useNavigate()
  const state=useSelector(state=>state.auth)
  return (
    <Layout titile='admin-dashboard'>
     <div className='admindashboard'>
     <Sidebar/>
    <div className='admin-dash-content'>
      <div className='grid-items'><h3>Total Users</h3></div>
      <div className='grid-items'><h3>Total products</h3>
        <button className='btn btn-primary' onClick={()=>{navigate('/dashboard/admin/product')}}>Productlist</button></div>
      <div className='grid-items'><h3>Total Categories</h3></div>
      <div className='grid-items'><h3>Revenue</h3></div>
    </div>
    </div>
      
    </Layout>
  )
}

export default AdminDashboard