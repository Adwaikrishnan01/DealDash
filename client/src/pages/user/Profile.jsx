import React from "react"
import {Link} from 'react-router-dom'
import { Avatar } from "antd"
import { UserOutlined } from '@ant-design/icons';
const UserProfile=()=>{
    return(<li className="nav-item dropdown">
    <Link
      className="nav-link dropdown-toggle"
      href="#"
      id="navbarDropdown"
      role="button"
      data-bs-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
     <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />  
  </Link>
    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
    <Link className="dropdown-item" to="/login">
       Logout
      </Link>
      <Link className="dropdown-item" to="/user/manageuser">
       Profile
      </Link>
     

    </div>
  </li>)
   
   }
   export default UserProfile