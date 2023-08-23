import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, removeItem } from '../components/Redux/cartSlice.jsx'
import './Cartlist.scss'
import { useNavigate, Link } from 'react-router-dom'
import DropIn from "braintree-web-drop-in-react";
import API from '../../services/API.jsx'
import store from '../components/Redux/store.jsx'
import Layout from '../components/layout/Layout.jsx'
import { getCurrentUser } from '../components/Redux/authActions.jsx'
const Cartlist = () => {
  const [clientToken, setclientToken] = useState("")
  const [instance, setInstance] = useState()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { cartlist } = useSelector((state) => state.cart)
  const user = useSelector((state) => state.auth.user)
  console.log("cartlistitems", cartlist);
  //clientToken
  const getToken = async (req, res) => {
    const { data } = await API.get("/api/v1/payment/braintree/token")
    setclientToken(data?.clientToken)
    console.log("clientToken", data)

  }
  const handlePayment = async () => {
    try {
      setLoading(true)
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await API.post('/api/v1/payment/braintree/payment', { nonce, cartlist })
      setLoading(false)
      alert("payment completed successfully")
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  useEffect(() => {
    getToken()
  }, [user])
  useEffect(() => {
    store.dispatch(getCurrentUser())
  }, [])
  const rendercart = cartlist.map((item) => {
    return (
      <div className="col-md-7 border-dark" key={item._id}>
        <div className="list-group">
          
            <div className="d-flex align-items-center border border-3 m-1">
              <Link to={`/product-detail/${item.slug}`} className="list-group-item list-group-item-action">
              <img
                src={`http://localhost:8000/api/v1/product/getphoto/${item._id}`}
                alt="img"
                className="img-thumbnail m-1"
                style={{ maxWidth: 150 }}
              />
              <div className='m-2'>
                <h5 className="mb-0">{item.name}</h5>
                <small className="text-muted">{item.description.substring(0, 29)}</small>
                 <p className="m-1">Price: {item.price}</p></div></Link>
              <div className="col d-flex flex-column align-items-between mx-3">
                <div className="d-flex flex-column align-items-center mt-1">
                  <div className="d-flex justify-content-center mt-1">
                    <button className='btn btn-secondary rounded-circle mx-1' onClick={() => dispatch(decrement(item._id))}>-</button>
                    <span>{item.count}</span>
                    <button className='btn btn-secondary rounded-circle mx-1' onClick={() => dispatch(increment(item._id))}>+</button>
                  </div><button className='btn btn-danger mt-1' onClick={() => dispatch(removeItem(item._id))}>Remove</button>
                </div>
              </div>

            </div>
           
          


        </div>
      </div>







    )
  })
  const Ordersummary = ({ cartlist }) => {
    let total = 0;
    console.log("orderysummmm", cartlist);
    return (
      <div className='col-md-8'><table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>count</th>
            <th>price</th>
          </tr>
        </thead>
        <tbody>
          {cartlist.map((item) => {
            total = total + (item.price * item.count);
            return (<tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.count}</td>
              <td>{item.price * item.count}</td>
            </tr>)
          })
          }</tbody>
        <tfoot><tr>
          <td>Total</td>
          <td>{total}</td></tr>
        </tfoot>


      </table> </div>
    )
  }
  return (<>
    <Layout title='Cartlist'>
    <div className='cartlist-body'>{(!user) ? (<><h5>You have {cartlist.length} items in your cartlist </h5>
      {cartlist.length > 0 && <button className='btn btn-info' onClick={() => { navigate('/login') }}>Login to checkout</button>}</>) :
      (<>{cartlist.length > 0 ? (<>{rendercart}

        <h4>Order summery</h4>
        <Ordersummary cartlist={cartlist} /> <div className='row bg-light border border-1 '
          style={{ width: '80%', margin: '1rem', display: 'flex', alignItems: "center" }}>
          <div className='col md-3 align-self-start mt-3' style={{ marginLeft: '5rem', flexGrow: '3', textAlign: 'flex-start' }}>
            <h6 style={{ textAlign: 'flex-start' }}>Shipping address:</h6>
            <p>{user?.address}</p>

          </div>
          <div className='col md-9 cd ' style={{ flexGrow: '8' }}> {!clientToken ? "loading....." : <DropIn
            options={{
              authorization: clientToken,
              paypal: {
                flow: "vault",
              },
            }}
            onInstance={(instance) => setInstance(instance)} />}
          </div>
        </div>

        <button className='btn btn-secondary' onClick={handlePayment}
          disabled={loading || !instance || !user?.address}>{loading ? "Processing" : "Pay"}</button></>) : <h5>your cart is empty</h5>}  </>)}
    </div>
    </Layout>
  </>
  )

}
export default Cartlist;