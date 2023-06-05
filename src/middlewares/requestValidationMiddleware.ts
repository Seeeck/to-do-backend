import { Response, Request, NextFunction } from "express";
import ApiResponse from "../helpers/apiResponse";
const { validationResult } = require('express-validator');


const requestValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ code:422,message:'Request error',errors: errors.array() });
    }
    next();
}

export default requestValidationMiddleware;