import React from 'react'
import { Link } from 'react-router-dom'


const Sidebar = () => {
  return (<> 
  <div className="sidebar">
      <h2 className="text-white">Sidebar</h2>
      <ul className="list-unstyled">
            <li>< Link to='/admindashboard/users' className="text-white">Users</ Link></li>
            <li>< Link to='/admindashboard/products' className="text-white">Products</ Link></li>
            <li>< Link to='/admindashboard/category' className="text-white">Category</ Link></li>
       
      </ul>
    </div></>
   
  )
}

export default Sidebar