
const isFutureDate = (value: Date) => {
    const currentDate = new Date();
    const inputDate = new Date(value);
    inputDate.setUTCHours(0,0,0,0)
    currentDate.setUTCHours(0,0,0,0)
   
    

    
    if (inputDate<currentDate) {
        throw new Error(`El día debe ser mayor o igual que el día actual:${currentDate.toLocaleDateString()}`);

    }

    return true;
};

const createTaskSchema = {

    title: {
        notEmpty: true,
        errorMessage: 'title field cannot be empty',
        isLength: { options: { min: 4, max: 40 } },
        exists: true,
    },
    description: {
        notEmpty: false,
        errorMessage: 'description category cannot be empty',
        isLength: { options: { max: 250 } },
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

export default createTaskSchema;