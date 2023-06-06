import { Request, Response } from "express";
import { AuthInterface } from "../repositories/authInterface";



class AuthController implements AuthInterface {

    private authentication;

    constructor(authInterface: AuthInterface) {
        this.authentication = authInterface;
    }

    signUp(request: Request, response: Response) {
        return this.authentication.signUp(request, response);
    }

    verifyAccount(request: Request, response: Response) {
        return this.authentication.verifyAccount(request, response);
    }

    signIn(request: Request, response: Response) {
        return this.authentication.signIn(request, response);
    }

}

export default AuthController;