import { AuthInterface } from "./authInterface";
import { Request, Response } from "express";
import ApiResponse from "../helpers/apiResponse";
import { User } from "../models/user";
import { sendMail } from "../config/email.config";
import { linkVerifyTokenHtml } from "../mail/authenticationMailsHtml";
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
import db from "../config/database";
class AuthRepositorie implements AuthInterface {


  async signUp(req: Request, res: Response) {

    const t = await db.transaction();

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

    try {
      const user_saved = await user_instance.save({ transaction: t });
      const token = await jwt.sign({ user_id: user_saved.dataValues.id, state: "pending" }, config.secret);
      const html = linkVerifyTokenHtml(token);

      try {
        await sendMail({ to: params.email, subject: "Verify email!", text: "Verify email!", html: html })
      } catch (error: any) {

        await t.rollback();
        return ApiResponse.errorResponse({ code: 500, res: res, error: error.message })
      }

      t.commit()
      return ApiResponse.successResponse({
        code: 202,
        message: `we sent a link verification,check your email!.`,
        res,
        data: {
          user_saved,
          verify: 'pending',
        },

      });
    } catch (error: any) {
      await t.rollback();
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