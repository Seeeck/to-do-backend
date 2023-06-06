
import { Response, Request } from "express";

export interface AuthInterface {
    signUp(request: Request, response: Response): Promise<Response>;
    verifyAccount(request: Request, response: Response): Promise<Response>;
    signIn(request: Request, response: Response): Promise<Response>;
}