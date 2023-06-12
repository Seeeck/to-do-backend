import { AuthInterface } from "./authInterface";
import { Request, Response } from "express";
import ApiResponse from "../helpers/apiResponse";
import { User } from "../models/user";
import { sendMail } from "../config/email.config";
import { linkVerifyTokenHtml } from "../mail/authenticationMailsHtml";
import db from "../config/database";
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
require('dotenv').config();

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
      const token = await jwt.sign({ user_id: user_saved.dataValues.id, state: "pending" }, config.secret, { expiresIn: '24h' });
      const html = linkVerifyTokenHtml(token, req.ip);
      console.log("token", token)
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
    try {

      const t = await db.transaction();
      const jwt_decoded = await jwt.verify(req.query.token, process.env.AUTH_SECRET);
      console.log('jwt_decoded', jwt_decoded)
      const user_updated = await User.update({
        state: 'active'
      }, {
        where: {
          id: jwt_decoded.user_id
        },
        transaction: t
      })

      await t.commit()
      if (user_updated > [0]) {

        return ApiResponse.successResponse({
          res: res,
          code: 200,
          message: `User verified, now you can access in your to-do app.`,
        });
      } else {
        await t.rollback();
        return ApiResponse.errorResponse({
          res: res,
          message: "Failed to verify token.",
          code: 401
        })
      }

    } catch (error: any) {
      return ApiResponse.errorResponse({ code: 500, res: res, error: error })
    }

  }

  async signIn(req: Request, res: Response) {

    try {
      const t = await db.transaction();

      const params = {
        user_name_email: req.body.user_name_email,
        password: req.body.password
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      let user: User | null = null;
      if (emailRegex.test(params.user_name_email)) {
        user = await User.findOne({
          where: {
            email: params.user_name_email
          }
        })
      } else {
        user = await User.findOne({
          where: {
            user_name: params.user_name_email
          }
        })
      }

      if (user?.dataValues.state == "active") {

        const compare = await bcrypt.compare(params.password, user?.dataValues.password);
        let token_user_update: number | [affectedCount: number] | never[] = []
        let token = ''

        if (compare) {
          token = await jwt.sign({ user_id: user?.dataValues?.id }, config.secret, { expiresIn: '168h' });
          token_user_update = await User.update({
            auth_token: token
          }, {
            where: {
              id: user?.dataValues.id
            }
          })
        }

        if (token_user_update > [0] && token) {
          return ApiResponse.successResponse({
            res: res,
            code: 200,
            message: `User logged!`,
            data: {
              token: token
            }
          });

        } else {

          return ApiResponse.errorResponse({ code: 500, res: res, error: "Failed to generate token." })

        }
      } else {
        return ApiResponse.errorResponse({ code: 500, res: res, error: "The account is in state inactive or pending." })
      }

    } catch (error: any) {
      return ApiResponse.errorResponse({ code: 500, res: res, error: "Username or email or password are incorrect." })
    }

  }


}

export default AuthRepositorie;