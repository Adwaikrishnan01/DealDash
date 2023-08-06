import React from 'react'
import Sidebar from './components/Sidebar.jsx'

import Layout from '../../components/layout/Layout'

const Manageusers = () => {
  return (
   <Layout>
     <div className='admindashboard'> 
     <Sidebar/>
     <div className='user-content'><h3>Manage users</h3></div>
     </div>
   
   </Layout>
   
  )
}

export default Manageusers