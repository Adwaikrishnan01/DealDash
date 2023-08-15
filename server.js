import express from 'express';
import colors from "colors";
import dotenv from "dotenv"
import connectDB from './config/db.js';
import morgan from 'morgan';
import authRoutes from './router/authRoute.js'
import cors from 'cors'
import categoryRoutes from './router/categoryRoute.js';
import productRoutes from './router/productRoute.js'
import paymentRoutes from './router/paymentRoute.js'
const app=express()
dotenv.config();

connectDB()
const PORT=process.env.PORT 
app.use(cors());
app.use(express.json())
app.use(morgan('dev'));

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/category",categoryRoutes)
app.use("/api/v1/product",productRoutes)
app.use("/api/v1/payment",paymentRoutes)

app.get('/',(req,res)=>{
    res.send('<p>Ecommerce app</p>');
})

app.listen(PORT,()=>{
   console.log(`server running on port ${PORT}`.bgCyan.white);
})