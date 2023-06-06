
const deleteTaskSchema = {
    user_id: {
        notEmpty: true,
        errorMessage: 'user_id field cannot be empty.',
        isInt: {
            errorMessage: "user_id must be a integer.",
        }
    },
    task_id: {
        notEmpty: true,
        errorMessage: 'task_id field cannot be empty.',
        isInt: {
            errorMessage: "task_id must be a integer.",
        }
    }
};

export default deleteTaskSchema;