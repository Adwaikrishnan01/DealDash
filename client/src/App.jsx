
import Contact from './pages/Contact.jsx'
import Homepage from './pages/Homepage.jsx'
import About from './pages/About.jsx'
import Policy from './pages/Policy.jsx'
import Pagenotfound from './pages/Pagenotfound.jsx'
import './App.css'
import{Routes,Route} from 'react-router-dom'

function App() {


  return (
    <>
    <Routes> 
      <Route exact path='/' element={<Homepage/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/policy' element={<Policy/>}/>
      <Route path='./*' element={<Pagenotfound/>}/>
      </Routes>

   
    </>
  )
}

export default App
