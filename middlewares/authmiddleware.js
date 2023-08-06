import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";
import AsyncHandler from "express-async-handler";

export const requireSignin = AsyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(" ")[1];
      if (!token) {
        throw new Error('Not authorized, token fail');
      }
      try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        console.log("decoded:", decoded);
            req.user = await userModel.findById(decoded._id)
            console.log("@@@@@",req.user)
        next();
      } catch (error) {
        throw new Error('Not authorized, invalid token');
      }
    } else {
      throw new Error('Not authorized, token not provided');
    }
  });
export const isAdmin = AsyncHandler(async (req, res, next) => {
    const user = await userModel.findById(req.user.id)
    if (user.role === 1) {
        next()
    }
    else {
        res.status(401);
        throw new Error("user is not admin")
    }
}
)