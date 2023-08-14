import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/layout/Layout'
import API from '../../../services/API'
import store from '../../components/Redux/store'
import { getCurrentUser } from '../../components/Redux/authActions'
const UserHome = () => {
const user=useSelector((state)=>state.auth.user)
const dispatch=useDispatch()
const [toggle,setToggle]=useState(false)
const Edituser=()=>{
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("")
    const navigate = useNavigate(); 
    const handleupdate=async(e)=>{
        e.preventDefault()
        console.log("mmmMM",email)
        try{
        const{data}= await API.put("/api/v1/auth/edituserProfile",{name,email,phone,address})
         if(data?.success) 
         {
          alert("user updated successfully")
               setToggle(!toggle)
            store.dispatch(getCurrentUser()) 
        }
   }catch(error){
       console.log(error)}
    }
    return(<div className='outer-container'><form onSubmit={handleupdate}>
    <div className='login-container'>
      <input className='name' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}></input>
      <input className='email' placeholder='Enter the email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
      <input className='phone' placeholder='Phone number' value={phone} onChange={(e) => setPhone(e.target.value)}></input>
      <input className='address' placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)}></input>
      <button className='btn' type="submit" S>Save</button>
    </div></form></div>)

}
  return (
  <Layout>
  <div className='container-fluid mt-3 ' style={{height:"100vh"}}> 
  <div className='row md-12 align-items-center row-height-100vh'><div className='col col-height-100vh'>
        Orders</div>
    <div className='col'><div className='row'>
  <div className="col-md-12 ">
    <h3 className='text-start'>Welcome {user.name}</h3>
    {toggle?  <Edituser/>:(<><p className='text-start offset-1'>email: {user.email}</p>
    <p className='text-start offset-1'>phone: {user.phone}</p>
    <p className='text-start offset-1'>address: {user?.address}</p></>)}
  </div>
  {!toggle &&<div className="row-md-12 offset-2"> 
    <button className='btn btn-primary  ' onClick={() => setToggle(!toggle)}>Edit user</button>
  </div>}
</div>
            <div className='row'> </div>
        </div>
        </div>
   
    
   
  </div></Layout>
  )
}

export default UserHome