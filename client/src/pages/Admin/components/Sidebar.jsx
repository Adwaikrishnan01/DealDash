import React from 'react'
import { Link } from 'react-router-dom'


const Sidebar = () => {
  return (<> 
  <div className="sidebar">
     
      <ul className="list-unstyled">
            <li>< Link to='/admindashboard/users' >Users</ Link></li>
            <li>< Link to='/admindashboard/products' >Products</ Link></li>
            <li>< Link to='/dashboard/admin/categories' >Category</ Link></li>
       
      </ul>
    </div></>
   
  )
}

export default Sidebar