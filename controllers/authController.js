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
     console.log("unhashedpass",password)
     console.log("userpassword",user.password)
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

  export const currentUser = async (req, res) => {
    try {
      const user = await userModel.findOne({ _id: req.body.userId });
      return res.status(200).send({
        success: true,
        message: "User Fetched Successfully",
        user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "unable to get current user",
        error,
      });
    }
  };
  export const test=AsyncHandler(async(req,res)=>{ 
    try{
      res.json(req.user)
    }
   catch(error){
        res.send(error)
   }

  });
   