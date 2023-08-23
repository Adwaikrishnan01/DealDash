import React from 'react'
import Sidebar from './components/Sidebar.jsx'

import Layout from '../../components/layout/Layout'

const Manageusers = () => {
  return (
   <Layout>
     <div className='admindashboard'> 
     <div className='col-md-3' style={{height:"100vh"}}> <Sidebar/></div>
    
     <div className='user-content'><h3>Manage users</h3></div>
     </div>
   
   </Layout>
   
  )
}

export default Manageusers