
const isFutureDate = (value: Date) => {
    const currentDate = new Date();
    const inputDate = new Date(value);

    inputDate.setUTCHours(0, 0, 0, 0)
    currentDate.setUTCHours(0, 0, 0, 0)

    if (inputDate < currentDate) {
        throw new Error(`the day must be equal to or greater than the actual day ${currentDate.toLocaleDateString()}.`);
    }
    return true;
};

export default isFutureDate;