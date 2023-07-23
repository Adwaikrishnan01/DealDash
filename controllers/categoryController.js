import AsyncHandler from 'express-async-handler'
import categoryModel from '../models/categoryModel.js'
import slugify from "slugify";
export const createCategorycontroller=AsyncHandler(async(req,res)=>{
    const {name}=req.body;
    console.log("category",name)
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