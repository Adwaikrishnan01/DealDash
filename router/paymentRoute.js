import express from 'express'
import { braintreeToken } from '../controllers/paymentController'
const router=express.Router()
router.route('/braintree/token').get(braintreeToken)
//router.route('/braintree/payment').post(braintreePayment)
export default router