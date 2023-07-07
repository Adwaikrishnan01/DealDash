
import Contact from './pages/Contact.jsx'
import Homepage from './pages/Homepage.jsx'
import About from './pages/About.jsx'
import Policy from './pages/Policy.jsx'
import Login from './pages/Auth/Login.jsx'
import Pagenotfound from './pages/Pagenotfound.jsx'

import './App.css'
import{Routes,Route} from 'react-router-dom'
import Register from './pages/Auth/Register.jsx'


function App() {


  return (
    <>
    <Routes> 
      <Route exact path='/' element={<Homepage/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/policy' element={<Policy/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/*' element={<Pagenotfound/>}/>
      </Routes>
      
      
   
    </>
  )
}

export default App
