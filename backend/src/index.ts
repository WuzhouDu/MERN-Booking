import express, { Request, Response } from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import userRouter from './routes/users';

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then((_) => {
    console.log("connected to mongodb");
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/users', userRouter);

app.listen(7001, () => {
    console.log("server running on localhost:7001");
});