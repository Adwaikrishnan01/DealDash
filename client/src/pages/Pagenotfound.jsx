import React from 'react'
import'./pagenotfound.scss'
import Helmet from 'react-helmet'
const Pagenotfound = () => {
  return (<>
  <Helmet><title>404 Error</title></Helmet>
  
  <div className='container'>
      
      <h1>404</h1>
   <div>PAGE NOT FOUND</div> 
   </div></>
    
    
  )
}

export default Pagenotfound