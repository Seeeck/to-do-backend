import { AuthInterface } from "./authInterface";
import { Request, Response } from "express";
import ApiResponse from "../helpers/apiResponse";



class AuthRepositorie implements AuthInterface {


    async signUp(req: Request, res: Response) {

        return ApiResponse.successResponse({ code: 202, res, data: req.body });

    }

    async verifyAccount(req: Request, res: Response) {
        return res;
    }

    async signIn(req: Request, res: Response) {
        return res;
    }


}

export default AuthRepositorie;