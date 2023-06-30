import express from 'express'
import AsyncHandler from "express-async-handler";
import {regrister,login,test} from '../controllers/authController.js'
import { requireSignin ,isAdmin} from '../middlewares/authmiddleware.js';
const router=express.Router();

router.route("/regrister").post(regrister)
router.route("/login").post(login)
router.route('/test').get(requireSignin,isAdmin,test)

export default router;
