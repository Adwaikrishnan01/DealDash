import React from 'react'
import {useEffect,useState} from 'react'
import Layout from '../components/layout/Layout'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate,Link } from 'react-router-dom'
import API from '../../services/API'
import Spinner from 'react-bootstrap/Spinner';
import { Checkbox, Radio } from 'antd'
import { Prices } from '../components/Prices'
import { addtocart } from '../components/Redux/cartSlice'
import store from '../components/Redux/store'
import { getCurrentUser } from '../components/Redux/authActions'
const Homepage = () => {
  const {loading,error,user}=useSelector((state)=>state.auth)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [products, setProducts] = useState([]);
  const [category,setCategory]=useState([])
  const[checked,setChecked]=useState([])
  const [radio,setRadio]=useState([])
      
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
          const token=localStorage.getItem("token")
          if(token){
            store.dispatch(getCurrentUser())
          }
          getAllCategory()
          getAllProducts();
          
        }, []);

        const handleFilter=(value,id)=>{
          let all=[...checked]
        
          
          if (value) {
            all.push(id);
          } else {
            all = all.filter((c) => c !== id);
          }
          setChecked(all);
        }
      const filteredProducts=async()=>{
                 try{
                  const {data}=await API.post('/api/v1/product/product-filter',{checked,radio})
                  setProducts(data?.products)
                
                
                 }catch(error){
                  console.log(error)
                 }
      }
      useEffect(() => {
        if (!checked?.length || !radio?.length) getAllProducts();
      }, [checked.length, radio.length]);
    
      useEffect(() => {
        if (checked?.length || radio?.length) filteredProducts();
      }, [checked, radio]);
    
  return (
    <Layout title={'DealDash-home'}>
        {user?.role===1 && navigate('/admindashboard')}
        
        {loading? (<div className='text-center'><Spinner/></div>):(<>
        <div className='container-fluid row mt-3 home-page'>
          <div className='col mt-3 filters'>
            <h4 className='test-center'>Filter by category</h4>
            <div className='d-flex flex-column'>
              {category?.map((c)=>(
                <Checkbox key={c.id} onChange={(e) => handleFilter(e.target.checked, c._id)}
                >{c.name}</Checkbox>  
              ))}
            </div>
             <h4 className='test-center mt-4'>Filter by Price</h4>
            <div className='d-flex flex-column'>
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
            </div>
            <div className='d-flex flex-column'>
            <button
              className="btn btn-secondary mt-2"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
            </div>
          </div>
         
    
        <div className="col-md-9 ">
        
          <div className="d-flex flex-wrap">
            {products?.map((p) => (<>
                <div className="card m-2" key={p.id} style={{ width: "18rem" }} >
                <Link to={`/product-detail/${p.slug}`} className="list-group-item list-group-item-action">
                  <img
                    src={`http://localhost:8000/api/v1/product/getphoto/${p._id}`}
                    className="card-img-top"
                    alt={p.name} style={{height:"280px",maxwidth:"130px"}}
                  /></Link>
                  <div className="card-body" >
                    <h5 className="card-title" >{p.name}</h5>
                    <p className="card-text">{p.description.substring(0,29)}</p>
                    <p className="card-text">$ : {p.price}</p>
                    <div className="row-md-12 d-flex justify-content-between">
                 
                    <button className='btn btn-primary' onClick={()=>{store.dispatch(addtocart(p))}}>Add to cart</button></div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      
      </div>          
       </> )}
        
    </Layout>   
  )
}

export default Homepage