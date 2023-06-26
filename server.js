import express from 'express';
import colors from "colors";
import dotenv from "dotenv"
import connectDB from './config/db.js';
import morgan from 'morgan';
import authRoutes from './router/authRoute.js'
const app=express()
dotenv.config();

connectDB()
const PORT=process.env.PORT 
app.use(express.json())
app.use(morgan('dev'));
app.use("/api/v1/auth",authRoutes)

app.get('/',(req,res)=>{
    res.send('<p>Ecommerce app</p>');
})

app.listen(PORT,()=>{
   console.log(`server running on port ${PORT}`.bgCyan.white);
})