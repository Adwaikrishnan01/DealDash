import React,{useState,useEffect} from 'react'
import Layout from '../../components/layout/Layout.jsx'
import Sidebar from './components/Sidebar.jsx';
import { useNavigate } from 'react-router-dom';
import { Select} from 'antd';
import API from '../../../services/API.jsx';
const ManageProduct = () => {
        const navigate = useNavigate();
        const [categories, setCategories] = useState([]);
        const [category, setCategory] = useState("");
        const [name, setName] = useState("");
        const [description, setDescription] = useState("");
        const [price, setPrice] = useState("");
        const [quantity, setQuantity] = useState("");
        const [shipping, setShipping] = useState("");
        const [photo, setPhoto] = useState("");
 
        const getallCategory = async () => {
            try {
              const { data } = await API.get('/api/v1/category/getallcategory')
              if (data.success) {
                console.log("oo", data)
                setCategories(data.allcategory);
              }
            } catch (error) {
              console.log(error)
            }
        
          }

          //create product
const handleCreate=async()=>{
    const productData=new FormData()
    productData.append("name", name);
    productData.append("description", description);
    productData.append("price", price);
    productData.append("quantity", quantity);
    productData.append("photo", photo);
    productData.append("category", category);
    try{
         const { data } = API.post("/api/v1/product/createproduct", productData )
        if(data?.success){
            console.log("prosuxt",data)
         alert("product created successfully")
      }
    }catch(error){
      console.log(error)
    }
   
}   


 useEffect(() => {
  getallCategory();
}, []);
 
  return (
   <Layout title='Create Product'>
    <div className='admindashboard'>
      <Sidebar />
      <div className='manage-cat-container'>
      <div className="col-md-9">
            <h1>Create Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
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
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            
      </div>
      </div></div>
      </div>
 </Layout>
  )
}

export default ManageProduct