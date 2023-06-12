import { Router } from "express";
import { Request, Response } from "express";
import AuthRepositorie from "../repositories/authRepositorie";
import AuthController from "../controllers/authController";
import requestValidationMiddleware from "../middlewares/requestValidationMiddleware";
import { checkSchema } from "express-validator";
import signUpAuthSchema from "../schemas/signUpAuthSchema";
import signInAuthSchema from "../schemas/signInAuthSchema";


const authRoute = Router();
const repositorie = new AuthRepositorie();
const authController = new AuthController(repositorie)

authRoute.post(
    '/sign-up',
    checkSchema(signUpAuthSchema),
    requestValidationMiddleware,
   
    (req: Request, res: Response) => {
        return authController.signUp(req, res);
    }
);

authRoute.get('/verify-account', (req: Request, res: Response) => {
    return authController.verifyAccount(req, res);
})

authRoute.post('/sign-in',
    checkSchema(signInAuthSchema),
    requestValidationMiddleware, (req: Request, res: Response) => {
        return authController.signIn(req, res);
    })


export default authRoute;