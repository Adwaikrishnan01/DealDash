import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, removeItem } from '../components/Redux/cartSlice.jsx'
import './Cartlist.scss'



const Cartlist = () => {

  const dispatch = useDispatch();
  const { cartlist } = useSelector((state) => state.cart)
  const user = useSelector((state) => state.auth.user)
  console.log("cartlistitems", cartlist);
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
    <div className='cartlist-body'>{(!user)?<h5>Login to continue</h5>:
    (<>{cartlist.length > 0 ? (<>{rendercart}
      <h4>Ordery summery</h4>
      <Ordersummary cartlist={cartlist} />
      <button className='btn btn-secondary'>Pay</button></>) : <h5>your cart is empty</h5>}  </>)}

    </div>
  </>
  )

}
export default Cartlist;