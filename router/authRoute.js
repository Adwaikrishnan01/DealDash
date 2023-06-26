import express from 'express'
import {regristerController} from '../controllers/authController.js'
const router=express.Router();

router.post("/regrister",regristerController);
export default router;
