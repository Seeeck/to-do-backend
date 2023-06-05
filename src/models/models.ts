import { User } from "./user";
import { Task } from "./task";

User.hasMany(Task,{foreignKey:"user_id"});
Task.belongsTo(User,{foreignKey:"user_id"});

export {User,Task}