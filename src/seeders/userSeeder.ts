import { User } from "../models/user"
const bcrypt = require('bcrypt');
const userSeeder = async ({ users = 5 }) => {
    try {
        for (let i = 1; i <= users; i++) {
            const hash = await bcrypt.hash(`user${i}Password/`, 10)
            await User.create({
                user_name: `user ${i}`,
                email: `user${i}@gmail.com`,
                birth_date: `1999-06-09T15:30:00Z`,
                password: hash
            })
        }
        console.log('Users inserted.')
    } catch (e) {
        console.log("Users already exists", e);
    }
}


export default userSeeder;