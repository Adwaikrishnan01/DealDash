import express from 'express'
import { createCategorycontroller,deletecategory,getCategory,
         getsingleCategory,updateCategorycontroller } from '../controllers/categoryController.js'
import { isAdmin, requireSignin } from '../middlewares/authmiddleware.js'

const router=express.Router()
router.route('/create').post(requireSignin,isAdmin,createCategorycontroller)
router.route('/update/:id').put(requireSignin,isAdmin,updateCategorycontroller)
router.route('/getallcategory').get(getCategory)
router.route('/getsinglecategory/:slug').get(getsingleCategory)
router.route('/deletecategory/:id').delete(requireSignin,isAdmin,deletecategory)
export default router;
