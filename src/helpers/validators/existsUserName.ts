import { User } from "../../models/user";

const existsUserName = async (userName: string) => {

    const existsUserName = await User.findOne({
        where: {
            user_name: userName
        }
    })

    if (existsUserName) {
        throw new Error(`the username '${userName}' already exists.`);
    }
    return true;
};

export default existsUserName;