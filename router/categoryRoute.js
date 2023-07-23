import express from 'express'
import { createCategorycontroller } from '../controllers/categoryController.js'
import { isAdmin, requireSignin } from '../middlewares/authmiddleware.js'

const router=express.Router()
router.route('/create').post(requireSignin,isAdmin,createCategorycontroller)

export default router;
