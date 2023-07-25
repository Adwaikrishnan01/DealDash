import express from 'express'
import { createProduct, getProduct, getSingleProduct, productPhoto,deleteProduct,updateProduct} from '../controllers/productController.js';
import formidable from 'express-formidable'


const router=express.Router()
router.route('/createproduct').post(formidable(),createProduct)
router.route('/getproduct').get(getProduct)
router.route('/getsingleproduct/:slug').get(getSingleProduct)
router.route('/getphoto/:id').get(productPhoto)
router.route('/deleteproduct/:id').delete(deleteProduct)
router.route('/updateproduct/:id').put(formidable(),updateProduct)

export default router;