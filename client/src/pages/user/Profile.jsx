import React from "react"
import {Link} from 'react-router-dom'
import { Avatar } from "antd"
import { userLogout } from '../../components/Redux/authSlice';
import { useSelector, useDispatch } from 'react-redux'
import { UserOutlined } from '@ant-design/icons';
const UserProfile=()=>{
  const dispatch = useDispatch();
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
    <button className="dropdown-item"  style={{padding:"10px 20px"}}onClick={() => dispatch(userLogout())}>
       Logout
      </button>
      <Link className="dropdown-item" to="/user/manageuser">
       Profile
      </Link>
     

    </div>
  </li>)
   
   }
   export default UserProfile