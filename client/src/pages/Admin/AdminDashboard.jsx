import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import { useNavigate } from 'react-router-dom';
import API from '../../../services/API.jsx'

import './admin.scss'
const AdminDashboard = () => {
  const [productsLength, setProducts] = useState('');
  const [usersLength, setUsers] = useState('');
  const [categoryLength, setCategory] = useState('');
  const navigate = useNavigate()
  const state = useSelector(state => state.auth)

  const getAllProducts = async () => {
    try {
      const { data } = await API.get("/api/v1/product/getproduct");
      setProducts(data.products.length);

    } catch (error) {
      console.log(error);
    }
  };

  const getallCategory = async () => {
    try {
      const { data } = await API.get('/api/v1/category/getallcategory')
      if (data.success) {
        setCategory(data.allcategory.length);
      }
    } catch (error) {
      console.log(error)
    }

  }
  const getUsers = async () => {
    const { data } = await API.get("/api/v1/auth/getallusers")
    setUsers(data?.users.length)
  }
  useEffect(() => {
    getAllProducts()
    getUsers()
    getallCategory()
  }, [])


  return (<>
    <Layout title='admin-dashboard'>
      <div className='admindashboard'>
        <div   >
          <Sidebar />
        </div>
        <div className='admin-dash-content'>
          <Link to={"/dashboard/admin/product"} className="list-group-item list-group-item-action">
            <div className='grid-items'>  <div className="card" style={{ width: '15rem' }}>
              <img src="/box.png " className="card-img-top" alt="..." style={{ maxHeight: "200px" }} />
              <div className="card-body">
                <h5 className="card-title">Products</h5>

              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Total products : {productsLength}</li>


              </ul>

            </div></div></Link>

          <Link to={"/dashboard/admin/users"} className="list-group-item list-group-item-action">
            <div className='grid-items'>  <div className="card" style={{ width: '15rem' }}>
              <img src="/group.png" className="card-img-top" alt="..." style={{ maxHeight: "200px" }} />
              <div className="card-body">
                <h5 className="card-title">Users</h5>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Total users : {usersLength}</li>
              </ul>

            </div>
            </div>
          </Link>
          <Link to={"/dashboard/admin/categories"} className="list-group-item list-group-item-action">
            <div className='grid-items'><h3></h3>
              <div className="card" style={{ width: '15rem' }}>
                <img src="/category.png" className="card-img-top" alt="..." style={{ maxHeight: "200px" }} />
                <div className="card-body">
                  <h5 className="card-title">Categories</h5>

                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Total categories : {categoryLength} </li>
                </ul>

              </div></div>
          </Link>
          <Link to={"/dashboard/admin/sale"} className="list-group-item list-group-item-action">
            <div className='grid-items'>
              <div className="card" style={{ width: '15rem' }}>
                <img src="/trend.png" className="card-img-top" alt="..." style={{ maxHeight: "200px" }} />
                <div className="card-body">
                  <h5 className="card-title">Sales</h5>

                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Total sales : 0</li>


                </ul>

              </div>
            </div></Link>
        </div>
      </div>

    </Layout>
  </>)
}

export default AdminDashboard

