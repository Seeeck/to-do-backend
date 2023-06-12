import { Schema } from "express-validator";
import existsEmail from "../helpers/validators/existsEmail";


const signInAuthSchema: Schema = {

    user_name_email: {

        errorMessage: "user_name or email field cannot be empty.",
        isLength: {
            options: {
                min: 4,
            },
            errorMessage: "user_name_email must have at least 4",

        },
        isEmpty: false,
      

    },
    password: {
        isEmpty: false,
        errorMessage: "password cannot be empty.",
        isLength: {
            options: { min: 8 }
            ,
            errorMessage: "password must have at least 8 character."
        },

    },

}

export default signInAuthSchema;