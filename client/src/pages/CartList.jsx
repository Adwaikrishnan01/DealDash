import React,{useState,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, removeItem } from '../components/Redux/cartSlice.jsx'
import './Cartlist.scss'
import { useNavigate } from 'react-router-dom'
import DropIn from "braintree-web-drop-in-react";
import API from '../../services/API.jsx'
import store from '../components/Redux/store.jsx'
import { getCurrentUser } from '../components/Redux/authActions.jsx'
const Cartlist = () => {
   const [clientToken,setclientToken]=useState("")
   const [instance,setInstance]=useState()
   const [loading,setLoading]=useState(false)
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { cartlist } = useSelector((state) => state.cart)
  const user = useSelector((state) => state.auth.user)
  console.log("cartlistitems", cartlist);
  //clientToken
  const getToken=async(req,res)=>{
    const {data}=await API.get("/api/v1/payment/braintree/token")
    setclientToken(data?.clientToken)
    console.log("clientToken",data)

  }
  const handlePayment=async()=>{
    try{
      setLoading(true)
      const { nonce } = await instance.requestPaymentMethod();
      const {data}=await API.post('/api/v1/payment/braintree/payment',{nonce,cartlist})
      setLoading(false)
      alert("payment completed successfully")
    }catch(error){   
      console.log(error)
      setLoading(false)
    }
  }
  useEffect(()=>{
    getToken()
  },[user])
  useEffect(()=>{
   store.dispatch(getCurrentUser())
  },[])
  const rendercart = cartlist.map((item) => {
    return (
      <div className='cartlist-container' key={item._id}>
        <img src={`http://localhost:8000/api/v1/product/getphoto/${item._id}`} alt=""></img>
        <h3>{item?.name}</h3>
        <p>price : {item.price}$</p>


        <div className="cartbuttons">
          <button className='decrement' onClick={() => dispatch(decrement(item._id))}>-</button>
          {item.count}
          <button className='decrement' onClick={() => dispatch(increment(item._id))}>+</button></div>
        <button className='btn btn-danger mt-1' onClick={() => dispatch(removeItem(item._id))}>Remove</button>


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
            <th>prie</th>
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
    <div className='cartlist-body'>{(!user)?(<><h5>You have {cartlist.length} items in your cartlist </h5>
    {cartlist.length>0 &&<button className='btn btn-info' onClick={()=>{navigate('/login')}}>Login to checkout</button>}</>):
    (<>{cartlist.length > 0 ? (<>{rendercart}
    <div className='row'>
      <h6>Shipping address</h6>
      <p>{user?.address}</p>
    </div>
      <h4>Order summery</h4>
      <Ordersummary cartlist={cartlist} />
      <div> {!clientToken?"loading.....":<DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}/>}
       </div>  
     
      <button className='btn btn-secondary' onClick={handlePayment}
      disabled={loading || !instance || !user?.address}>{loading?"Processing":"Pay"}</button></>) : <h5>your cart is empty</h5>}  </>)}
    </div>
  </>
  )

}
export default Cartlist;