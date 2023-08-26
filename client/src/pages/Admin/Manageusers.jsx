import React from 'react'
import Sidebar from './components/Sidebar.jsx'
import {useState,useEffect} from 'react'
import Layout from '../../components/layout/Layout'
import CategoryForm from '../../components/form/categoryForm.jsx';
import API from '../../../services/API.jsx'
import { Modal } from 'antd';
const Manageusers = () => {
  const [users,setUsers]=useState([])
  const [visible,setVisible]=useState(false)
  // const[updatedName,setUpdatedName]=useState('')
 
  // const [selected, setSelected] = useState(null)

  const getUsers=async()=>{
    const {data}=await API.get("/api/v1/auth/getallusers") 
   setUsers(data?.users)
  }
  const handleDelete=async(id)=>{
    try{
      const {data}=await API.delete(`/api/v1/auth/deleteuser/${id}`)
        if(data?.success){ 
          alert("User deleted successfully")
          getUsers()
        } 
        
  }catch(error){
    console.log(error)
  }
    
  }
  // const handleUpdate=async(e)=>{ 
  //   e.preventDefault()
  //   try{ 
  //     const {data}=await API.put(`/api/v1/auth/updateuser/${selected._id}`, { name: updatedName })
      
  //     if (data?.success) {
  //       alert(`${updatedName} is updated`);
  //       setSelected(null);
  //       setUpdatedName("");
  //       setVisible(false);
  //       getUsers();
  //     } else {
  //       alert("error in data")
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
   
  useEffect(()=>{
  getUsers()
  },[]) 
  return (
   <Layout>
     <div className='admindashboard'> 
     <div className='sidebar-height' ><Sidebar/></div> 
  
     <div className='user-content'><h3>Manage users</h3>
     <div className='category-table'>
          {/* <TableComponent props={category} header={header} />  */}
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((c) => (
                <>
                  <tr>
                    <td key={c._id}>{c.name}</td>
                    <td>
                      {/* <button
                        className="btn btn-primary ms-2"
                        onClick={() => {
                          setVisible(true);
                          setUpdatedName(c.name);
                          setSelected(c);
                        }}
                      >
                        Edit
                      </button> */}
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
        >
        </Modal>
     </div>
     </div>
   
   </Layout>
   
  )
}

export default Manageusers