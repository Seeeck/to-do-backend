


import isFutureDate from "../helpers/validators/isFutureDate";
import { Schema, body, oneOf } from 'express-validator';

const oneOfUpdateTask = () => {
    return oneOf(
        [
            body('task_title').notEmpty(),
            body('task_description').notEmpty(),
            body('email').notEmpty(),
            body('task_day').notEmpty(),
            body('finished_task').notEmpty()

        ], {
        message: 'At least one valid contact method must be provided',
    })
}


const updateTaskSchema: Schema = {
    user_id: {
        notEmpty: true,
        errorMessage: 'user_id Code cannot be empty.',
        isInt: {
            errorMessage: "user_id must be a integer."
        }
    },
    task_id: {
        notEmpty: true,
        errorMessage: 'task_id Code cannot be empty.',
        isInt: {
            errorMessage: "task_id must be a integer."
        }
    },
    task_title: {
        errorMessage: 'task_title field cannot be empty.',
        optional: true,
        isLength: {
            options:
            {
                min: 4,
                max: 40
            },
            errorMessage: "title must be at least 8 characters and 40 maximum."
        },

    },
    task_description: {
        optional: true,
        errorMessage: 'task_description category cannot be empty.',
        isLength: {
            options: {
                max: 250
            },
            errorMessage: 'title must have 40 characters maximum.',
        },
    },
    task_day: {
        optional: true,
        errorMessage: 'task_day Code cannot be empty.',
        isDate: {
            errorMessage: 'Invalid date.',

        },
        custom: {
            options: isFutureDate,
        },
    },
    finished_task: {
        optional: true,
        errorMessage: 'finished_task is required',
        isBoolean: {
            errorMessage: 'finished_task must be a boolean value.',
        }

    },


}

export { updateTaskSchema, oneOfUpdateTask };