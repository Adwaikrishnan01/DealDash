import express from 'express'
import { createProduct, getProduct, getSingleProduct, productPhoto,deleteProduct,updateProduct, 
    filterProduct, searchProduct, relatedProduct, getCategoryProducts, getOrderedProduct} from '../controllers/productController.js';
import formidable from 'express-formidable'
import { isAdmin, requireSignin } from '../middlewares/authmiddleware.js';


const router=express.Router()
router.route('/createproduct').post(formidable(),createProduct)
router.route('/getproduct').get(getProduct)
router.route('/getsingleproduct/:slug').get(getSingleProduct)
router.route('/getphoto/:id').get(productPhoto)
router.route('/deleteproduct/:id').delete(deleteProduct)
router.route('/updateproduct/:id').put(formidable(),updateProduct)
router.route('/product-filter').post(filterProduct)
router.route('/search-product/:keyword').get(searchProduct)
router.route('/related-product/:pid/:cid').get(relatedProduct)
router.route('/category-products/:slug').get(getCategoryProducts)
router.route('/ordered-products').get(requireSignin,getOrderedProduct)

export default router;