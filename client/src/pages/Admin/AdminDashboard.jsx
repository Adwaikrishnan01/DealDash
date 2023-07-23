import React from 'react'
import Layout from '../../components/layout/Layout'
import { useSelector } from 'react-redux'
const AdminDashboard = () => {
  const state=useSelector(state=>state.auth)
  return (
    <Layout titile='admin-dashboard'>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
          
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3> Admin Name : {state?.user?.name}</h3>
              <h3> Admin Email : {state?.user?.email}</h3>
              <h3> Admin Contact : {state?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard