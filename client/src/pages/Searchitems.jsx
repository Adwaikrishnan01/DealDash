import React,{useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate ,Link} from 'react-router-dom'
import API from '../../services/API'
import { useState } from 'react'
import Layout from '../components/layout/Layout'
const Searchitems = () => {
  const [items,setItems]=useState([])
    const word=useSelector(state=>state.search).searchterm
    const searchedProducts=async()=>{
      try{
        const products=await API.get(`/api/v1/product/search-product/${word}`)
        if(products){
          console.log(products)
          setItems(products.data)
          console.log("prosuct list",items);
          }
            
      }catch(error){  
     console.log(error)
    }
    }  
   
    useEffect(()=>{
      searchedProducts()
     
    },[word])
  return ( 
    <Layout title='Searched Products'>
      <div className="col-md-9 ">
          <h1 className="text-center">Search results</h1>
          <div className="d-flex flex-wrap">
            {items.length>0 ? (items.map((p) => (<>
              <Link key={p._id} className="product-link" >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`http://localhost:8000/api/v1/product/getphoto/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title" >{p.name}</h5>
                    <p className="card-text">{p.description.substring(0,29)}</p>
                    <p className="card-text">{p.price}</p>
                  </div>
                </div>
              </Link></>
            ))):(<h3>no products found</h3>)}
          </div>
        </div>
    </Layout>
  )
}

export default Searchitems