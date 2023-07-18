
import Contact from './pages/Contact.jsx'
import Homepage from './pages/Homepage.jsx'
import About from './pages/About.jsx'
import Policy from './pages/Policy.jsx'
import Login from './pages/Auth/Login.jsx'
import Pagenotfound from './pages/Pagenotfound.jsx'
import Dashboard from './pages/Dashboard.jsx'
import PrivateRoute from './components/routes/Private.jsx'
import './App.css'
import{Routes,Route} from 'react-router-dom'
import Register from './pages/Auth/Register.jsx'
import Forgotpassword from './pages/Auth/Forgotpassword.jsx'


function App() {


  return (
    <>
    <Routes> 
      
      {/* <Route exact path="/" element={< PrivateRoute Component={Homepage} />} /> */}
      <Route path='/' element={<Homepage/>}/>
      <Route path="/dashboard" element={< PrivateRoute Component={Dashboard} />} />
      <Route path='/contact' element={<Contact/>}/>
      {/* <Route path='/about' element={<About/>}/> */}
      <Route exact path="/about" element={< PrivateRoute><About/></PrivateRoute>}/>
      <Route path='/policy' element={<Policy/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/forgotpassword' element={<Forgotpassword/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/*' element={<Pagenotfound/>}/>
      </Routes>
      
      
   
    </>
  )
}

export default App
