import React, { useState, useEffect } from "react";
import Layout from '../../components/layout/Layout'
import { Link } from "react-router-dom";
import API from "../../../services/API";
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
      
        //lifecycle method
        useEffect(() => {
          getAllProducts();
        }, []);

  return (
   <Layout title='Product list'>
    <div className="row dashboard">
        <div className="col-md-3">
        
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
   </Layout>
  )
}

export default Products