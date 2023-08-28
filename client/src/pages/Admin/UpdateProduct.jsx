import React,{useState,useEffect} from 'react'
import Layout from '../../components/layout/Layout.jsx'
import Sidebar from './components/Sidebar.jsx';
import { useNavigate,useParams } from 'react-router-dom';
import { Select} from 'antd';
import API from '../../../services/API.jsx';

const updateProduct = () => {
        const navigate = useNavigate();
        const params=useParams()
        const [categories, setCategories] = useState([]);
        const [category, setCategory] = useState("");
        const [name, setName] = useState("");
        const [description, setDescription] = useState("");
        const [price, setPrice] = useState("");
        const [quantity, setQuantity] = useState("");
        const [shipping, setShipping] = useState("");
        const [photo, setPhoto] = useState("");
        const [id, setId] = useState("");
 
        const getallCategory = async () => {
            try {
              const { data } = await API.get('/api/v1/category/getallcategory')
              if (data.success) {
                setCategories(data.allcategory);
              }
            } catch (error) {
              console.log(error)
            }
        
          }
    //get single product
    const getSingleProduct=async()=>{
        try{
            const {data}=await API.get(`/api/v1/product/getsingleproduct/${params.slug}`)
           console.log("single",data)
           if (data.success){  
             setPrice(data.product.price);
            setDescription(data.product.description);
            setName(data.product.name);
            setQuantity(data.product.quantity);
            //setShipping(data.product.shipping);
            setCategory(data.product.category); 
            setId(data.product._id);
          }
            
            
        }catch(error){
        console.log(error)
    }
    }

          //update product
const handleUpdate=async()=>{
    const productData=new FormData()
    productData.append("name", name);
    productData.append("description", description);
    productData.append("price", price);
    productData.append("quantity", quantity);
    productData.append("photo", photo);
    productData.append("category", category._id);
    try{
         const { data } = await API.put(`/api/v1/product/updateproduct/${id}`, productData )
        if(data?.success){
         alert("product updated successfully")
      }
    }catch(error){
      console.log(error)
    }
   
}   
//DELETE

const handleDelete=async()=>{
  try{
    let answer = window.prompt("Are You Sure want to delete this product ? ");
    if(!answer) return
   const {data}= await API.delete(`api/v1/product/deleteproduct/${id}`)
   alert("Product deleted successfully")
  }catch(error){
    console.log(error)
  }
}

 useEffect(() => {
  getallCategory();
}, []);

useEffect(() => {
  getSingleProduct();
}, []);
 
  return (
   <Layout title='Create Product'>
    <div className='admindashboard'>
      <Sidebar />
      <div className='manage-cat-container'>
      <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                value={category.name}
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                >
                {categories?.map((c) => (
                  <Select.Option key={c._id} value={c._id}>
                    {c.name}
                  </Select.Option >
                ))}</Select>
                 <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                ><Select.Option value="0">No</Select.Option>
                <Select.Option value="1">Yes</Select.Option>
              </Select></div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
              
            
      </div>
      </div></div>
      </div>
 </Layout>
  )
}

export default updateProduct