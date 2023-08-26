import React from 'react'
import Sidebar from './components/Sidebar.jsx'
import Layout from '../../components/layout/Layout.jsx'
//import TableComponent from './components/Table.jsx';
import CategoryForm from '../../components/form/categoryForm.jsx';
import API from '../../../services/API.jsx';
import { useState, useEffect } from 'react'
import { Modal } from 'antd';

const Managecategory = () => {
  const [category, setCategory] = useState([])
  const [visible, setVisible] = useState(false)
  const [name, setName] = useState("")
  const [selected, setSelected] = useState(null)
  const [updatedName, setUpdatedName] = useState("")

  const getallCategory = async () => {
    try {
      const { data } = await API.get('/api/v1/category/getallcategory')
      if (data.success) {
        console.log("ooo", data)
        setCategory(data.allcategory);
      }
    } catch (error) {
      console.log(error)
    }

  }

  //update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.put(
        `/api/v1/category/update/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        alert(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getallCategory();
      } else {
        alert("error in data")
      }
    } catch (error) {
      console.log(error);
    }
  };
  //Delete
  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/v1/category/deletecategory/${id}`)
      alert("category deleted")
      getallCategory();

    } catch (error) {
      console.log(error)
    }
  }
  
  //create category
  const handleSubmit=async(e)=> {
    e.preventDefault()
    try {
      const { data } = await API.post('api/v1/category/create', { name })
      if (data?.success) {
        getallCategory()
        alert(`${name} category created`)
      }
      else {
        alert("error in creating category")
      }
    } catch (error) {
      console.log(error)
    }
  }
  console.log("categorylist", category)
  
  useEffect(() => {
    getallCategory(); 
  }, []);



return (
  <Layout>
    <div className='admindashboard'>
    <div className='sidebar-height' ><Sidebar/></div> 
      <div className='manage-cat-container'>
        <div className='add-category'>
          <CategoryForm
            handleSubmit={handleSubmit}
            value={name}
            setValue={setName}
          /></div>
        <div className='category-table' style={{marginTop:"40px"}}>
          {/* <TableComponent props={category} header={header} />  */}
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {category?.map((c) => (
                <>
                  <tr>
                    <td key={c._id}>{c.name}</td>
                    <td>
                      <button
                        className="btn btn-primary ms-2"
                        onClick={() => {
                          setVisible(true);
                          setUpdatedName(c.name);
                          setSelected(c);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger ms-2"
                        onClick={() => {
                          handleDelete(c._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
        <Modal
          onCancel={() => setVisible(false)}
          footer={null}
          visible={visible}
        ><CategoryForm
            value={updatedName}
            setValue={setUpdatedName}
            handleSubmit={handleUpdate}
          />
        </Modal>
      </div>

    </div>

  </Layout>

)
}
export default Managecategory