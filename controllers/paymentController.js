import AsyncHandler from "express-async-handler";
import braintree from "braintree";
import dotenv from 'dotenv'
import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import orderModel from "../models/orderModel.js";

dotenv.config()
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
  });
  export const braintreeToken = async (req, res) => {
    try {
      gateway.clientToken.generate({}, function (err, response) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(response);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  export const braintreePayment = async (req, res) => {
    try {
      const { nonce, cartlist } = req.body;
      // const itemIds = cartlist.map(item => item._id)
      // const objectIds = itemIds.map(id =>new mongoose.Types.ObjectId(id));
      // console.log("id of itens",itemIds)
      //  const fullProductDetails = await productModel.find({ _id: { $in: objectIds } }).select("-photo");
      //  console.log("Full product details", fullProductDetails);
      let total = 0;
      cartlist.map((i) => {
        total += i.price*i.count;
      });
      let newTransaction = gateway.transaction.sale(
        {
          amount: total,
          paymentMethodNonce: nonce,  
          options: {
            submitForSettlement: true,
          },
        },
        function (error, result) {
          if (result) {
            const order = new orderModel({
              products: cartlist,
              payment: result,
              buyer: req.user._id,
            }).save();
           
            res.json({ ok: true });
        } else {
            res.status(500).send(error);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };