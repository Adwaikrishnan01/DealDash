import AsyncHandler from 'express-async-handler'
import categoryModel from '../models/categoryModel.js'
import slugify from "slugify";
export const createCategorycontroller=AsyncHandler(async(req,res)=>{
    const {name}=req.body;
    const category=await categoryModel.findOne({name})
    if(!category){
         await categoryModel.create({name,slug:slugify(name)}).then(()=>{
            res.status(201).send({name:name,message:'new category created'})
        })
    }
    
    else { 
        res.status(400);
        throw new Error("category name already in use")
    }       

})

export const updateCategorycontroller=AsyncHandler(async(req,res)=>{
  const {id}=req.params
  const {name}= req.body;
  console.log("update",name,id)
  const newcategory=await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
  if(newcategory)
    res.status(201).send({newcategory})
  else{
    throw new Error("error in updating category")
  }
})

//get all category
export const getCategory=AsyncHandler(async(req,res)=>{
  const allcategory=await categoryModel.find({})
  if(!allcategory){
    throw new Error("Category is empty")
  }else{
    res.status(200).json({allcategory})
  }
    })

  //singlecategory
  export const getsingleCategory=AsyncHandler(async(req,res)=>{
    const singlecategory=await categoryModel.find({slug: req.params.slug})
    if(!singlecategory){
      throw new Error("Category not found")
    }else{
      res.status(200).json({singlecategory})
    }
      })

//delete category
  export const deletecategory=AsyncHandler(async(req,res)=>{
  const {id}=req.params;
  await categoryModel.findByIdAndDelete(id).then(()=>{
    res.status(201).json({message:"contact deleted succesfully"});
  })
});
