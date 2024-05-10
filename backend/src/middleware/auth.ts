import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies['auth_token'];
    if (!token) {
        res.status(401).send({message: "unauthorized"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
        req.userId = (decoded as JwtPayload).userId;
        next();
    } catch (error) {
        res.status(401).send({ message: "unauthorized" });
    }
}

export default verifyToken;