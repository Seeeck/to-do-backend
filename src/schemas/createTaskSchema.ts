import { Schema } from "express-validator";
import isFutureDate from "../helpers/validators/isFutureDate";
import { CustomValidation } from "express-validator/src/context-items";
import existsTask from "../helpers/validators/existsTask";

const createTaskSchema: Schema = {

    task_title: {
        notEmpty: true,
        errorMessage: 'task_title field cannot be empty.',
        isLength: {
            options:
            {
                min: 4,
                max: 40
            },
            errorMessage: "title must be at least 8 characters and 40 maximum."
        },
        custom:{
            options:existsTask
        },
        exists: true,
    },
    task_description: {
        notEmpty: false,
        errorMessage: 'task_description category cannot be empty.',
        isLength: {
            options: {
                max: 250
            },
            errorMessage: 'title must have 40 characters maximum.',
        },
    },
    task_day: {
        notEmpty: true,
        errorMessage: 'task_day Code cannot be empty.',
        isDate: {
            errorMessage: 'Invalid date.',
        },
        custom: {
            options: isFutureDate,
        },
    },
    user_id: {
        notEmpty: true,
        errorMessage: 'user_id Code cannot be empty.',
        isInt: {
            errorMessage:"user_id must be a integer."
        }
    },
    
    
};

export default createTaskSchema;