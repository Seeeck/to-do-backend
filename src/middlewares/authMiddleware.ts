import { NextFunction, Request, Response } from "express";


const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");


const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization
    console.log('el token:', token)
    if (!token) {
        return res.status(403).send({
            message: "No token provided!",
        });
    }
    token = token.split(' ')[1];
    return await jwt.verify(token,
        config.secret,
        (err: any, decoded: any) => {
            if (err) {

                console.log(err)
                return res.status(401).send({
                    message: "Unauthorized!",
                });
            }

            if (decoded) {
                if (req.body.user_id !== decoded.user_id) {
                    return res.status(401).send({
                        message: "Unauthorized!",
                    });
                }
            }
            next();
        });
};



export { verifyToken }