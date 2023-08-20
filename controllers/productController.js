import AsyncHandler from 'express-async-handler'
import productModel from '../models/productModel.js'
import slugify from "slugify";
import categoryModel from '../models/categoryModel.js';
import orderModel from '../models/orderModel.js'
import dotenv from 'dotenv'
import fs from 'fs'


export const createProduct=AsyncHandler(async(req,res)=>{
    const { name, description, price, category, quantity, shipping } =   req.fields;
    const { photo } = req.files;
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }
    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
    if(!products)
     throw new Error("error in creating products")
})
//get all products
export const getProduct = AsyncHandler(async (req, res) => {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "ALlProducts ",
      products,
    });
   if(!products){
      throw new Error("Error in getting products")
  }
});
//getsingleproduct
export const getSingleProduct = AsyncHandler(async (req, res) => {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
   if(!product)
      throw new Error("no products found")
});
//get photo seperatly
export const productPhoto = AsyncHandler(async (req, res) => {
    const product = await productModel.findById(req.params.id).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
    else{ 
    console.log(error);
    res.status(500).send({
    success: false,
    message: "Erorr while getting photo",
    error,
    });
  } 
});

export const deleteProduct=AsyncHandler(async(req,res)=>{
  const product=await productModel.findByIdAndDelete(req.params.id)
    res.status(201).send({message:"product deleted successfully",product})

  if(!product){
    throw new Error("product not found")
  }

})
export const updateProduct=AsyncHandler(async(req,res)=>{ 
  const { photo } = req.files;
  const newProduct=req.fields;
  if(!newProduct)
     throw new Error("Error in sending new product")
  const product=await productModel.findByIdAndUpdate( req.params.id,
    { ...req.fields, slug: slugify(req.fields.name) },
    { new: true })
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    else{throw new Error("photo not provided")}
  await product.save();
  res.status(201).send({message:"product updated successfully",product})
});
export const filterProduct=AsyncHandler(async(req,res)=>{
  const {checked,radio}=req.body;
  console.log(checked,radio)
  let args={};                       //filter products by setting arguments
  if(checked && checked.length > 0)
     args.category=checked;           //assign argument category to args array
  if(radio && radio.length)
     args.price={$gte:radio[0],$lte:radio[1]}; 
    console.log("args",args)       //assign argument price to args array
  const products=await productModel.find(args)
    if(products){
      res.status(200).send({success:true,products});
    }else{
      throw new Error("no products can be found");
    }
});
//searchproduct controller
export const searchProduct=AsyncHandler(async(req,res)=>{
  const {keyword}=req.params;
  const results=await productModel.find({
    $or:[                                           //mongodb or operator to query based on name or description
    { name: { $regex: keyword, $options: "i" } },
    { description: { $regex: keyword, $options: "i" } },  //i:case insensitive
    ]
  }).select("-photo");
    res.json(results);
  if(!results)
    throw new Error("no matching products found")
});

//fetch similar products
export const relatedProduct=AsyncHandler(async(req,res)=>{
  const {pid,cid}=req.params
  const products=await productModel.find({
    category:cid,
    _id:{$ne:pid}                                    //notincluded pid
  }).select("-photo").limit(7).populate("category")  //get products of same category excluding the current product
  res.send({success:true,products})
  if(!products){
    throw new Error("no similar products")
  }
});
//get product based on category
export const getCategoryProducts=AsyncHandler(async(req,res)=>{
 const category=await categoryModel.findOne({slug:req.params.slug})
 const products=await productModel.find({category}).populate("category")
 res.send({success:true,products,category})
 if(!products){
  res.send({message:"no products found"})
 }
})
//get users ordered products
export const getOrderedProduct=AsyncHandler(async(req,res)=>{
  const orders = await orderModel
  .find({buyer:req.user._id})
  .populate("products","-photo")
  .populate("buyer","name")
  .sort({ createdAt: -1 });
   res.send({
  success: true,
  counTotal:orders.length,
  orders,
});
if(!orders){
  throw new Error("Error in getting orders")
}
})
