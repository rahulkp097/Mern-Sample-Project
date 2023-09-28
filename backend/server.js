import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import {notFound,errorHandler} from './middleware/errorMiddileware.js';
import connectDB from './config/db.js'
import cors from 'cors'
const PORT = process.env.port || 5000;

connectDB();
const app  = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors());
app.use('/user',userRoutes);
app.use("/admin", adminRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT,()=> console.log("server started at ",PORT))
