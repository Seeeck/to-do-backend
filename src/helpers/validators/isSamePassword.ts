
const isSamePassword = (value: string, obj: { req: any }) => {
    console.log('value:', value);
    console.log("obj:", obj.req.body.password)
    if (value !== obj.req.body.password) {
        throw new Error()
    } else {
        return true
    }

};

export default isSamePassword;