import React from 'react'
import Layout from '../components/layout/Layout'
import './Aboutus.scss'
const About = () => {
  return (
    <Layout title='About'><div className='aboutus'>
      <div className='leftsection'>
              <img src='https://st2.depositphotos.com/3591429/10464/i/950/depositphotos_104648666-stock-photo-group-of-people-brainstorming-on.jpg'></img>
      </div>
      <div className='rightsection'>
   
        <h2>About us</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, reprehenderit repellat. Facilis cupiditate quas vitae, veniam ea dolor quis corrupti mollitia possimus autem assumenda delectus magni blanditiis quo numquam nostrum.</p>
      </div>
      </div></Layout>
    
  )
}

export default About