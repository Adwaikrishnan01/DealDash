import AsyncHandler from "express-async-handler";
import { json } from "express";
import userModel from'../models/userModel.js'
import { hashpassword } from "../helpers/authHelper.js";
export const regrister=AsyncHandler(async(req,res)=>{

    const {name,email,password,phone,address}=req.body
    const hashedpassword=await hashpassword(password)
    const user=await userModel.findOne({email})
    if(!user){
        const newuser=userModel.create({
            name,
            email,
            password:hashedpassword,
            phone,
            address
        })
        console.log(newuser)
    } 
    else{
        res.status(404)
        throw new Error("email already in use")
    }
    
})
 