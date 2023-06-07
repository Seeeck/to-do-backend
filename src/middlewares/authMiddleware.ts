import { NextFunction, Request, Response } from "express";


const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");


const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization

    if (!token) {
        return res.status(403).send({
            message: "No token provided!",
        });
    }

    jwt.verify(token,
        config.secret,
        (err: any, decoded: any) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized!",
                });
            }
            req.body.user_id = decoded.user_id;
            next();
        });
};

export { verifyToken }