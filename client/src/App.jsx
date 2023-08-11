
import Contact from './pages/Contact.jsx'
import Homepage from './pages/Homepage.jsx'
import About from './pages/About.jsx'
import Policy from './pages/Policy.jsx'
import Login from './pages/Auth/Login.jsx'
import Pagenotfound from './pages/Pagenotfound.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ProtectedRoute from './components/routes/ProtectedRoute.jsx'
import './App.css'
import{Routes,Route} from 'react-router-dom'
import Register from './pages/Auth/Register.jsx'
import Forgotpassword from './pages/Auth/Forgotpassword.jsx'

import AdminDashboard from './pages/Admin/admindashboard.jsx'
import PublicRoute from './components/routes/PublicRoute.jsx'
import Managecategory from './pages/Admin/Managecategory.jsx'
import Manageusers from './pages/Admin/Manageusers.jsx'
import ManageProduct from './pages/Admin/ManageProduct.jsx'
import UpdateProduct from './pages/Admin/UpdateProduct.jsx'
import Products from './pages/Admin/Products.jsx'
import Searchitems from './pages/Searchitems.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Categories from './pages/Categories.jsx'
import Test from './pages/Test.jsx'
import CategoryProduct from './pages/CategoryProduct.jsx'
function App() {
  return (
    <>
    <Routes> 
      <Route path='/test' element={<Test/>}/>
      <Route exact path="/" element={<Homepage/>} />
      <Route path='/all-categories' element={<Categories/>}/>
      <Route path='/product-detail/:slug' element={<ProductDetails/>}/>
      <Route path='/category-products/:slug' element={<CategoryProduct/>}/>
      <Route path="/dashboard" element={<ProtectedRoute> <Dashboard/></ProtectedRoute>} />
      <Route path='/contact' element={<Contact/>}/>
      {/* <Route path='/about' element={<About/>}/> */}
      <Route exact path="/about" element={< ProtectedRoute><About/></ProtectedRoute>}/>
      <Route path="/admindashboard" element={< ProtectedRoute><AdminDashboard/></ProtectedRoute>}/>
      <Route path='/policy' element={<ProtectedRoute><Policy/></ProtectedRoute>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/forgotpassword' element={<Forgotpassword/>}/>
      <Route path='/search' element={<Searchitems/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/*' element={<Pagenotfound/>}/>
        <Route path='/admindashboard' element={<ProtectedRoute><AdminDashboard/></ProtectedRoute>}/>
        <Route path='/admindashboard/users' element={<ProtectedRoute><Manageusers/></ProtectedRoute>}/>
        <Route path='/admindashboard/category' element={<ProtectedRoute><Managecategory/></ProtectedRoute>}/>
        <Route path='/admindashboard/products' element={<ProtectedRoute><ManageProduct/></ProtectedRoute>}/>
        <Route path='/dashboard/admin/product' element={<ProtectedRoute><Products/></ProtectedRoute>}/>
        <Route path='/dashboard/admin/product/:slug' element={<ProtectedRoute><UpdateProduct/></ProtectedRoute>}/>
      </Routes>
      
      
   
    </>
  )
}

export default App
