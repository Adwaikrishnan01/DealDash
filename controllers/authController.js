import AsyncHandler from "express-async-handler";
import { json } from "express";
import userModel from'../models/userModel.js'
import JWT from "jsonwebtoken";
import colors from 'colors'
import { comparePassword, hashpassword } from "../helpers/authHelper.js";
export const regrister=AsyncHandler(async(req,res)=>{

    const {name,email,password,phone,address}=req.body
    const hashedpassword=await hashpassword(password)
    const user=await userModel.findOne({email})
    if (!user) {
        userModel
          .create({
            name,
            email,
            password: hashedpassword,
            phone,
            address
          })
          .then((newuser) => {
            console.log('User created:', newuser);
      
            res.status(201).json({
              _id: newuser._id,
              name: newuser.name,
              email: newuser.email,
              phone: newuser.phone,
              address: newuser.address
            });
          })
          .catch((error) => {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Failed to create user' });
          });
      } 
})

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
        message: "authenticated" ,
         user:{name:user.name,
              email:user.email,
              phone:user.phone,
              },
         token,
});
  });   
  export const test=AsyncHandler(async(req,res)=>{ 
    try{
      res.json(req.user)
    }
   catch(error){
        res.send(error)
   }

  })