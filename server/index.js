import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDb from './config/connectDb.js';
import userRouter from './route/user.route.js';
import categoryRouter from './route/category.route.js';
import uploadRouter from './route/upload.route.js';
import SubCategoryRouter from './route/subCategory.route.js';

dotenv.config();

const app=express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    credentials:true,
    origin:process.env.FRONTEND_URL,
}));

app.use(cookieParser())
app.use(morgan());
app.use(helmet({
    crossOriginalResourcePolicy:false,

}))
const PORT= 8080|process.env.PORT


app.use('/api/user',userRouter)
app.use('/api/category',categoryRouter)
app.use('/api/file',uploadRouter)
app.use('/api/subCategory',SubCategoryRouter)
connectDb().then(()=>{
    app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`)
})
})


