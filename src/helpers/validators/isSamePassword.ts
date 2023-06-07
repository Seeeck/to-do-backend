
const isSamePassword = (value: string, obj: { req: any }) => {
    if (value !== obj.req.body.password) {
        throw new Error()
    } else {
        return true
    }

};

export default isSamePassword;