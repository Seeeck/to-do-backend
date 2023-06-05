
const listTaskSchema = {

    limit: {
        notEmpty: true,
        errorMessage: 'limit field cannot be empty.',
        isInt: {
            errorMessage: "limit must be a integer.",
            options: {
                min: 0
            }
        }
    },
    offset: {
        notEmpty: true,
        errorMessage: 'offset field cannot be empty.',
        isInt: {
            errorMessage: "offset must be a integer.",
            options: {
                min: 0
            }
        }
    },
    user_id: {
        notEmpty: true,
        errorMessage: 'user_id field cannot be empty.',
        isInt: {
            errorMessage: "user_id must be a integer.",
        }
    }
};

export default listTaskSchema;