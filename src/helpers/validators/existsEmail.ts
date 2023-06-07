import { User } from "../../models/user";

const existsEmail = async (email: string) => {

    const existsEmail = await User.findOne({
        where: {
            email: email
        }
    })

    if (existsEmail) {
        throw new Error(`the email '${email}' already exists.`);
    }
    return true;
};

export default existsEmail;