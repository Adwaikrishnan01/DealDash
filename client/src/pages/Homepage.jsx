import React from 'react'
import {useEffect,useState} from 'react'
import Layout from '../components/layout/Layout'
import { useSelector } from 'react-redux'
import { useNavigate,Link } from 'react-router-dom'
import API from '../../services/API'
import Spinner from 'react-bootstrap/Spinner';
import { Checkbox } from 'antd'
const Homepage = () => {
  const {loading,error,user}=useSelector((state)=>state.auth)
  const navigate=useNavigate()
  console.log("selector working",user)
 
  const [products, setProducts] = useState([]);
  const [category,setCategory]=useState([])
      
        //getall products
        const getAllProducts = async () => {
          try {
            const { data } = await API.get("/api/v1/product/getproduct");
            setProducts(data.products);
        
          } catch (error) {
            console.log(error);
          }
        };
        const getAllCategory=async()=>{
          try{
            const {data}=await API.get('/api/v1/category/getallcategory')
            setCategory(data?.allcategory)
          }catch(error){
            console.log(error)
          }
        }
      
        //lifecycle method
        useEffect(() => {
          getAllCategory()
          getAllProducts();
          
        }, []);
  
  return (
    <Layout title={'DealDash-home'}>

        {user?.role===1 && navigate('/admindashboard')}
        {error && <span>{alert(error)}</span>}
        {loading? (<Spinner/>):(<>
        <div className='container-fluid row mt-3 home-page'>
          <div className='col md-3 filters'>
            <h4 className='test-center'>Filter by category</h4>
            <div className='d-flex flex-column'>
              {category?.map((c)=>(
                <Checkbox onChange={(e) => handleFilter(e.target.checked, c._id)}
                >{c.name}</Checkbox>
              ))}
            </div>
          </div>
        </div>
            
        <div className="row dashboard">
        <div className="col-md-3">
        
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <Link
                key={p._id}
              
                className="product-link"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`http://localhost:8000/api/v1/product/getphoto/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title" >{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
                
       </> )}
        
    </Layout>   
  )
}

export default Homepage