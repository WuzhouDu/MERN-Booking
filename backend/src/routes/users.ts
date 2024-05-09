import express, { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import {check, validationResult} from 'express-validator';

const userRouter = express.Router();

userRouter.post("/register", [
    check("firstName", "First name is required!").isString(),
    check("lastName", "Last name is required!").isString(),
    check("email", "email is required!").isEmail(),
    check("password", "password with 6 or more chars is required!").isLength({ min: 6 }),

], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({message: errors.array()})
    }
    try {
        let user = await User.findOne({
            email: req.body.email,
        });

        if (user) {
            return res.status(400).json({ message: "User already exist" });
        }

        user = new User(req.body);
        await user.save();

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string, {
            expiresIn: "1d",
        });

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000,
        });
        return res.status(200).send();
    } catch (err) {
        res.status(500).send({ message: "Something Wrong" });
    }
})

export default userRouter;