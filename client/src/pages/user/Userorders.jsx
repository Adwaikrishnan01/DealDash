import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import API from '../../../services/API'
import {Link} from 'react-router-dom'

const Userorders = () => {
  const [orders, setOrders] = useState([])
  console.log("orders", orders)
  const getOrders = async () => {
    try {
      const { data } = await API.get('/api/v1/product/ordered-products')
      setOrders(data?.orders)

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getOrders()
  }, [])
  return (
    <Layout title='userorders'>
 <div className="container mt-5">
  <h1 className="text-center mb-4">Your Orders</h1>
  {orders.map((ord) => (
    <div className="row m-3 border border-secondary rounded p-3" key={ord._id}>
      <p className="mb-1">{ord.products.length} product</p>
      {ord.products?.map((item) => (
        <div className="col-lg-8" key={item._id}>
          <div className="list-group">
            <Link to={`/product-detail/${item.slug}`} className="list-group-item list-group-item-action">
              <div className="d-flex align-items-center">
                <img
                  src={`http://localhost:8000/api/v1/product/getphoto/${item._id}`}
                  alt="img"
                  className="img-thumbnail m-1"
                  style={{ maxWidth: 150 }}
                />
                <div className='m-2'>
                  <h5 className="mb-0">{item.name}</h5>
                  <small className="text-muted">{item.description.substring(0,29)}</small>
                </div>
              </div>
              <p className="m-1">Price: {item.price}</p>
              
              <small>{item.status}</small>
            </Link>
          </div>
        </div>
      ))}
      <p className="mb-1">Total Price: {ord.payment.transaction.amount}</p>
      <p className="mb-1">Order ID: {ord._id}</p>
      <p className="mb-1">Payment status: {ord.payment.success && "Amount paid"}</p>
      <p className="mb-1">Order status: {ord.status}</p>
    </div>
  ))}
</div>


    </Layout>
  )
}

export default Userorders