import { AuthInterface } from "./authInterface";
import { Request, Response } from "express";
import ApiResponse from "../helpers/apiResponse";
import { User } from "../models/user";
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
class AuthRepositorie implements AuthInterface {


    async signUp(req: Request, res: Response) {
        try {
            const hash_password = await bcrypt.hash(req.body.password, 10);
            const params = {
                email: req.body.email,
                user_name: req.body.user_name,
                birth_date: req.body.birth_date,
                password: hash_password,
            }

            const user_instance = User.build({
                user_name: params.user_name,
                email: params.email,
                birth_date: params.birth_date,
                password: params.password,
                state: 'pending'
            });


            const user_saved = await user_instance.save();
         
            var token = await jwt.sign({ user_id: user_saved.dataValues.id,state:"pending" }, config.secret);
            console.log(token)
            return ApiResponse.successResponse({
                code: 202,
                message: `verify account!.`,
                res,
                data: {
                    user_saved,
                    verify: 'pending',
                    verify_account_link: `localhost:3000/token/${token}`
                },

            });
        } catch (error: any) {
            return ApiResponse.errorResponse({ code: 500, res: res, error: error })
        }
    }

    async verifyAccount(req: Request, res: Response) {
        return res;
    }

    async signIn(req: Request, res: Response) {
        return res;
    }


}

export default AuthRepositorie;