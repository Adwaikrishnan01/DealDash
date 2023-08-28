import React, { useEffect, useState } from 'react'
import API from '../../services/API'
import { useParams,Link } from 'react-router-dom'
import Layout from '../components/layout/Layout'
const CategoryProduct = () => {
    const [category,setCategory]=useState('')
    const [products,setProducts]=useState([])
    
    const params=useParams()
    const getProduct=async()=>{
        const {data}=await API.get(`/api/v1/product/category-products/${params.slug}`)

        if(data?.success){
            console.log("data4",data)
            setProducts(data?.products)
          setCategory(data?.category)
        }
          
    }
    useEffect(()=>{
     if(params.slug) getProduct()
    },[params?.slug])
  return (
  <Layout>
        
         <div className="col-md-12 mt-3">
          <h6 className="text-center ">{products.length} products found in {category.name}</h6>
          <div className="d-flex justify-content-center flex-wrap mt-2">
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
                    <p className="card-text">{p.price}</p>
                    <div className="col-md-12 d-flex justify-content-between ">
                  
                    <button className='btn btn-primary'>Add to cart</button></div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
  </Layout>
  )
}

export default CategoryProduct