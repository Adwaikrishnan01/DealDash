import React from 'react'
import Layout from '../../components/layout/Layout'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import { useNavigate } from 'react-router-dom';
import CategoryIcon from '@mui/icons-material/Category';
import GroupIcon from '@mui/icons-material/Group';
import './admin.scss'
const AdminDashboard = () => {
  const navigate=useNavigate() 
  const state=useSelector(state=>state.auth)
  return (<>
    <Layout title='admin-dashboard'>
     <div className='admindashboard'>
     <div   >
        <Sidebar/>
        </div>
    <div className='admin-dash-content'>
    <Link to={"/dashboard/admin/product"} className="list-group-item list-group-item-action">
      <div className='grid-items'>  <div className="card" style={{width: '15rem'}}>
  <img src="/box.png " className="card-img-top" alt="..." style={{maxHeight:"200px"}}/>
  <div className="card-body">
    <h5 className="card-title">Products</h5>
   
  </div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item">Total products : </li>
  
   
  </ul>
  
</div></div></Link>

<Link to={"/dashboard/admin/users"} className="list-group-item list-group-item-action">
      <div className='grid-items'>  <div className="card" style={{width: '15rem'}}>
  <img src="/group.png" className="card-img-top" alt="..." style={{maxHeight:"200px"}} />
  <div className="card-body">
    <h5 className="card-title">Users</h5>
  </div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item">Total users : </li>
  </ul>
  
</div>
        {/* <button className='btn btn-primary' onClick={()=>{navigate('/dashboard/admin/product')}}>Productlist</button> */}
        </div>
        </Link>
        <Link to={"/dashboard/admin/categories"} className="list-group-item list-group-item-action">
      <div className='grid-items'><h3></h3>
      <div className="card" style={{width: '15rem'}}>
  <img src="/category.png" className="card-img-top" alt="..."  style={{maxHeight:"200px"}}/>
  <div className="card-body">
    <h5 className="card-title">Categories</h5>
   
  </div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item">Total categories : </li>
  </ul>
  
</div></div>
</Link>
<Link to={"/dashboard/admin/sale"} className="list-group-item list-group-item-action">
      <div className='grid-items'>
      <div className="card" style={{width: '15rem'}}>
  <img src="/trend.png" className="card-img-top" alt="..." style={{maxHeight:"200px"}}/>
  <div className="card-body">
    <h5 className="card-title">Sales</h5>
   
  </div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item">Total sales : </li>
    <li className="list-group-item">Revenue : </li>
   
  </ul>
  
</div>
</div></Link>
    </div>
    </div>
      
    </Layout>
  </>)
}

export default AdminDashboard

