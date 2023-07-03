import React from 'react'
import Layout from '../components/layout/Layout'
import './Contactus.scss'
const Contact = () => {
  return (
    <Layout title='Contactus'> <div className='contactus'>   
    <div className='leftsection'>
    <img src='https://img.freepik.com/free-photo/hot-line-contact-us-call-center-search-interface_53876-124009.jpg'></img>
</div>
<div className='rightsection'>

<h2>Contact us</h2>
<p>Email : shop@gmail.com</p>
<p>Phone :  2424248484</p>
</div></div>
   
</Layout>
    
  )
}

export default Contact