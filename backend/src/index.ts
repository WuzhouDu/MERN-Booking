import express, { Request, Response } from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import userRouter from './routes/users';
import authRouter from './routes/auths';
import cookieParser from 'cookie-parser';
import path from 'path';
import {v2 as cloudiary} from 'cloudinary';

cloudiary.config({
    cloud_name: process.env.CLOUDINART_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then((_) => {
    console.log("connected to mongodb");
}).catch((error) => {
    console.log(error);
}) ;

const app = express();

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(
    {
        credentials: true,
        origin: process.env.FRONTEND_URL,
    }
));

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

app.listen(7001, () => {
    console.log("server running on localhost:7001");
});