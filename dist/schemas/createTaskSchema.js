"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isFutureDate = (value) => {
    const currentDate = new Date();
    const inputDate = new Date(value);
    inputDate.setUTCHours(0, 0, 0, 0);
    currentDate.setUTCHours(0, 0, 0, 0);
    if (inputDate < currentDate) {
        throw new Error(`the day must be equal to or greater than the actual day ${currentDate.toLocaleDateString()}`);
    }
    return true;
};
const createTaskSchema = {
    title: {
        notEmpty: true,
        errorMessage: 'title field cannot be empty',
        isLength: {
            options: {
                min: 4,
                max: 40
            },
            errorMessage: "title must be at least 8 characters and 40 maximum"
        },
        exists: true,
    },
    description: {
        notEmpty: false,
        errorMessage: 'description category cannot be empty',
        isLength: {
            options: {
                max: 250
            },
            errorMessage: 'title must have 40 characters maximum',
        },
    },
    taskDay: {
        notEmpty: true,
        errorMessage: 'taskDay Code cannot be empty',
        isDate: {
            errorMessage: 'Invalid date',
        },
        custom: {
            options: isFutureDate,
        },
    },
};
exports.default = createTaskSchema;
