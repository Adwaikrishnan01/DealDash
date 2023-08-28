import AsyncHandler from "express-async-handler";
import { json } from "express";
import userModel from'../models/userModel.js'
import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
import JWT from "jsonwebtoken";
import colors from 'colors'
import { comparePassword, hashpassword } from "../helpers/authHelper.js";
export const register=AsyncHandler(async(req,res)=>{

    const {name,email,password,phone,address,answer}=req.body
    const hashedpassword=await hashpassword(password)
    const user=await userModel.findOne({email:req.body.email})
    if (!user) {
       userModel
          .create({
            name,
            email,
            password: hashedpassword,
            phone,
            address,
            answer
          }).then((createdUser) => { 
            res.status(201).json({
              _id: createdUser._id,
              name: createdUser.name,
              email: createdUser.email,
              phone: createdUser.phone,
              address: createdUser.address,
              success: true,
              message: "User Registerd Successfully",
            })
           } )
      }else { 
              res.status(400);
              throw new Error("User already registerd or the email already in use")
          }      
});

export const login = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: "Email and password are required" });
        return;
      }
    const user = await userModel.findOne({ email }); 
    if (!user) {  
        res.status(404);
      throw new Error("user not found");    
     }
  
      const authenticated = await comparePassword(password,user.password); 
      if (!authenticated) {
        res.status(200).json({ message: "incorrect email or password" });
      } 
      const token= JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"1d",})
       res.status(200).json({ 
         user:{name:user.name,
              email:user.email,
              phone:user.phone,
              role:user.role
              },
         isAuthenticated:true,     
         token,
         
});
});   

  export const forgotpassword=AsyncHandler(async(req,res)=>{
    const {email,newPassword,answer}=req.body;
    if(!email){
      throw new Error("Email required")
    }
    if(!newPassword){
      throw new Error("newpassword requied")
    }
    if(!answer){
      throw new Error("answer required")
    }
   

    const user=await userModel.findOne({email})
    if(!user){
      throw new Error("User not found")
    } 
     const sport=user.answer;
     if(sport===answer){
     const hashed=await hashpassword(newPassword)
     await userModel.findByIdAndUpdate(user._id,{password:hashed});
     res.status(200).send({
      message:"password reset successfully"
     })
    }else{
      res.status(400)
      throw new Error("your favourite sport doesn't match with your anwser")
    }
  })

  export const currentUser = AsyncHandler(async (req, res) => {
     const user=req.user;
     if(user){
        res.send({message:"user found successfully",
          user})
     }else{
       throw new Error("error in user")
     }
  })
  export const test=AsyncHandler(async(req,res)=>{ 
    try{
      res.json(req.user)
    }
   catch(error){
        res.send(error)
   }

  });
  export const editUserProfile=AsyncHandler(async(req,res)=>{
    const user = await userModel.findById(req.user._id);
    const {name,email,address,phone}=req.body
    if(!email){
      throw new Error("Email required")
    }
    if(!name){
      throw new Error("name required")
    }
    if(!address){
      throw new Error("address required")
    }
    if(!phone){
      throw new Error("Phone required")
    }
    const updateduser=await userModel.findByIdAndUpdate(user._id,{
      name:name ||user.name,
      email:email || user.email,
      address: address || user.address,
      phone:phone || user.phone},{new:true})
    res.send({success:true, updateduser})
    });

    //getallusers
    export const getallUsers=AsyncHandler(async(req,res)=>{
      try {
        const users = await userModel.find({}); 
        if (!users) {
          throw new Error("cannot find any users");
        }
        res.send({ message: true, users });
      } catch (error) {
        res.status(500).send({ message: false, error: error.message });
      }
    });
    export const deleteUser=AsyncHandler(async(req,res)=>{
      try{
        const id = req.params.id;
       await userModel.findByIdAndDelete(id)
         res.send({success:true,message:"user deleted successfully"})
      }catch(error){
        res.status(500).send(error);
      }
    })
    //update username
    export const updateUser=AsyncHandler(async(req,res)=>{
      try{
        const {id}=req.params
        const {name}=req.body
        const updateduser=await userModel.findByIdAndUpdate(id,{name:name},{new:true})
         res.send({success:true,updateduser})
      }catch(error){
        res.status(500).send(error);
      }
    })