import express from 'express'
import AsyncHandler from "express-async-handler";
import {regrister} from '../controllers/authController.js'
const router=express.Router();

router.route("/regrister").post(regrister)

export default router;
