import React,{useState,useEffect} from 'react'
import API from '../../services/API'

export const useCategory = () => {
    const [categories,setCategories]=useState([])
    const getCategories=async()=>{
        try{
        const {data}=await API.get('/api/v1/category/getallcategory')
        setCategories(data?.allcategory)
    }catch(error){
     console.log(error)
    }
}
    useEffect(()=>{
        getCategories()
    },[])
  return (
   categories
  )
}

