import express, {Request, Response} from 'express';
import User from '../models/user'

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
    try {
        let user = await User.findOne({
            email: req.body.email,
        });

        if (user) {
            return res.status(400).json({message: "User already exist"});
        }

        user = new User(req.body);
        await user.save();
    } catch (err) {
        res.status(500).send({message: "Something Wrong"});
    }
})