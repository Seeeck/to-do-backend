


import { Schema } from "express-validator";
import isSamePassword from "../helpers/validators/isSamePassword";

const signUpAuthSchema: Schema = {

    email: {
        notEmpty: true,
        isEmail: {
            errorMessage: "email must have a correct format: example@gmail.com"
        },
        errorMessage: "email cannot be empty."
    },
    user_name: {
        notEmpty: true,
        isLength: {
            options: {
                min: 4,
                max: 20
            },
            errorMessage: "user_name must be at least 4 characters and 40 maximum. "
        },
        errorMessage: "user_name field cannot be empty."
    },
    birth_date: {
        notEmpty: true,
        isISO8601: {
            errorMessage: "birth_date must be a date."
        },
        errorMessage: "birth_date cannot be empty."
    },
    password: {
        notEmpty: true,
        errorMessage: "password cannot be empty.",
        isLength: {
            options: { min: 8, max: 20 }
            ,
            errorMessage: "password must have at least 6 characters and 20 maximum."
        },
        matches: {
            options: /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
            errorMessage: `password must have at least a uppercase letter and one symbol(!, @, #, $, %, ^, &, *, (), _, +, -, [, ], {, }, ;, :, ", \\, |, ,, ., <, >, /, ?)`
        }
    },
    next_password: {
        notEmpty: true,
        errorMessage: "next_password cannot be empty.",
        custom: {
            options: isSamePassword,
            errorMessage: "the confirmation password must be the same as the password."
        }

    }
}

export default signUpAuthSchema;