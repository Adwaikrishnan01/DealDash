import React, { useState, useEffect } from "react";
import Layout from '../../components/layout/Layout'
import { Link } from "react-router-dom";
import API from "../../../services/API";
import Sidebar from "./components/Sidebar";
const Products = () => {
 
        const [products, setProducts] = useState([]);
      
        //getall products
        const getAllProducts = async () => {
          try {
            const { data } = await API.get("/api/v1/product/getproduct");
            setProducts(data.products);
        
          } catch (error) {
            console.log(error);
          }
        };
      
        useEffect(() => {
          getAllProducts();
        }, []);

  return (
   <Layout title='Product list'>
    
    <div className="admindashboard">
        <div className="col-md-3" style={{height:"100vh"}}>
        <Sidebar/>
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="product-link"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`http://localhost:8000/api/v1/product/getphoto/${p._id}`}
                    className="card-img-top"
                    alt={p.name} style={{maxHeight:"250px",maxwidth:"130px"}}
                  />
                  <div className="card-body">
                    <h5 className="card-title" >{p.name}</h5>
                    <p className="card-text">{p.description.substring(0,29)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
   </Layout>
  )
}

export default Products