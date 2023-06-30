import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";
import AsyncHandler from "express-async-handler";

export const requireSignin = AsyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = JWT.verify(token, process.env.JWT_SECRET);
            console.log("decoded:", decoded);
            req.user = await userModel.findById(decoded._id)

            next()
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not authorized,token fail')
        }
    }
    if (!token) {
        res.status(401)
        throw new Error('not authorized')
    }
})
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