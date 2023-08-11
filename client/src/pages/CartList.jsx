import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { increment,decrement } from '../components/Redux/cartSlice.jsx'
import './Cartlist.scss'



const Cartlist=()=>{
  
  const dispatch=useDispatch();
    const {cartlist}=useSelector((state)=>state.cart) 
    console.log("cartlistitems",cartlist);
    const rendercart=cartlist.map((item,key)=>{
      const productid=item.id;
        return(
            <div className='cartlist-container' key={key}>
          <img src={item?.image} alt=""></img>
          <h3>{item?.title}</h3>
          <p>price : {item.price}$</p>
        
      
         <div className="cartbuttons">
           <button className='decrement' onClick={()=>dispatch(decrement(productid))}>-</button>   
           {item.count}
          <button className='decrement' onClick={()=>dispatch(increment(productid))}>+</button></div>
         
          </div>
        )
    })
    const Ordersummary=({cartlist})=>{
      let total=0;
      console.log("orderysummmm",cartlist);
      return( 
      <table className='table'>
      <thead>
        <tr>
          <th>Name</th>
          <th>count</th>
          <th>prie</th>
        </tr>
      </thead>
      <tbody>
      {cartlist.map((item,key)=>{
        total=total+(item.price*item.count);
        return(<tr key={item.id}>
          <td>{item.title}</td>
          <td>{item.count}</td>
          <td>{item.price*item.count}</td>
        </tr>)
    })
      }</tbody>
    <tfoot><tr>
    <td>Total</td>
      <td>{total}</td></tr>
    </tfoot>
     
   
  </table>
      
     
      )
        
      
    }
    return(<>
     <div className='cartlist-body'>
       {rendercart}
       <h4>Ordery summery</h4>
       <Ordersummary cartlist={cartlist}/>
        </div>
        <button className='btn btn-secondary'>Pay</button>
        </>
       )

}
export default Cartlist;