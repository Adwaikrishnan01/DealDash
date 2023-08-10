import React, { useEffect } from 'react'
import Layout from '../components/layout/Layout'
import API from '../../services/API'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

const ProductDetails = () => {
 
    const [product,setProduct]=useState({})
    const [similarProd,setsimilarProd]=useState([])
    console.log(";;;",product)
    const params=useParams();
    useEffect(()=>{
         if(params?.slug) getSingleProduct();
    },[params?.slug])
    
    const getSingleProduct=async()=>{
        
        try{
             const {data}=await API.get(`/api/v1/product/getsingleproduct/${params.slug}`)
             console.log(data)
            setProduct(data?.product)
            relatedProducts(data?.product._id,data?.product.category._id)
        }catch(error){
            console.log(error)
        }
    }
    const relatedProducts=async(pid,cid)=>{
      try{
        const {data}=await API.get(`/api/v1/product/related-product/${pid}/${cid}`)
        console.log("similarproducts",data.products)
        setsimilarProd(data.products)
      }catch(error){
        console.log(error)
      }
       
    }
    
    
  return (
    <Layout title='product-detail'>
       
        <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={`http://localhost:8000/api/v1/product/getphoto/${product._id}`}
            alt={product.name}
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <h2 className="mb-4">{product.name}</h2>
          <p className="text-muted">Description: {product.description}</p>
           <h4 className="text-primary">Price:${product.price}</h4>
          
        </div>
        <div className='col-md-3'>
          <button className="btn btn-dark mt-5">Add to Cart</button></div>
      </div>
      <div className="container mt-4">
      <h5 className='text-left'>Similar products</h5>{similarProd.length===0 &&<p>no similar products found</p>}
      <div className="row flex-nowrap overflow-auto">
        {similarProd.map(pd => (
          <div key={pd.id} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={`http://localhost:8000/api/v1/product/getphoto/${pd._id}`}
                alt={pd.name}
                className="card-img-top"
              /> 
              <div className="card-body">
                <h5 className="card-title">{pd.name}</h5>
                <p className="text-muted">$ {pd.price}</p>
                <button className="btn btn-dark mt-1">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
      
    </div>
          
   
        
    </Layout>
  )
}

export default ProductDetails