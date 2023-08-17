import express from 'express'
import { braintreePayment, braintreeToken } from '../controllers/paymentController.js'
import { requireSignin } from '../middlewares/authmiddleware.js'

const router=express.Router()
router.route('/braintree/token').get(requireSignin,braintreeToken)
router.route('/braintree/payment').post(requireSignin,braintreePayment)
export default router 