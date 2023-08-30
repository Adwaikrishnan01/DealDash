import React from 'react'
import {
  MDBFooter,
  MDBContainer,
  MDBBtn
} from 'mdb-react-ui-kit';

const Footer = () => {
  return (

    <MDBFooter className='bg-secondary text-center text-white'>
    <MDBContainer className='p-4 pb-0'>
      <section className='mb-4'>
     
        <MDBBtn outline color="dark" floating className='m-1'  role='button'>
       <img src="public/facebook.png" style={{width:"26px"}}/> 
        </MDBBtn>

        <MDBBtn outline color="dark" floating className='m-1' href='#!' role='button'>
        <img src="google.png" style={{width:"25px"}}/> 
        </MDBBtn>
        <MDBBtn outline color="dark" floating className='m-1' href='#!' role='button'>
        <img src="instagram.png" style={{width:"25px"}}/> 
        </MDBBtn>

        <MDBBtn outline color="dark" floating className='m-1' href='#!' role='button'>
        <img src="github.png" style={{width:"25px"}}/> 
        </MDBBtn>

        <MDBBtn outline color="dark" floating className='m-1' href='#!' role='button'>
        <img src="twitter.png" style={{width:"25px"}}/> 
        </MDBBtn>
      </section>
    </MDBContainer>

    <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
      <div className='bg-secondary text-light p-3'>
        Made with <span className="red-heart">&#10084;&#65039;</span>
    </div>
 
     
    </div>
  </MDBFooter>

 )

   
}

export default Footer