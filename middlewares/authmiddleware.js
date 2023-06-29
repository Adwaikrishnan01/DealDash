import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";
import AsyncHandler from "express-async-handler";

export const requireSignin=AsyncHandler(async(req,res,next)=>{
    let token;
    if (req.headers.authorization && req.headers.autorization.startsWith('Bearer')){
        try{
         token=req.headers.authorization.split('')[1]
        JWT.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
            if(err){
                res.status(401)
                throw new Error("user is not authorized");
            }
            console.log(decoded);
        })
        console.log(decode);
        req.user = await userModel.findById(decode.id).select('-password')
          next()
        }catch(error){  
            console.log(error)
           res.status(401);
           throw new Error('not authorized,token fail')
        }
         

    }
    if(!token){
        res.status(401)
        throw new Error('not authorized')
    }

})