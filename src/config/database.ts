import { Sequelize } from "sequelize"
import { Task } from "../models/task";
import { User } from "../models/user";



const db = new Sequelize(
    'to_do_database',
    "seck",
    "seck123456",
    {
        host: "to-do-instance.cn7g4pvobdw4.sa-east-1.rds.amazonaws.com",
        port: 5432,
        dialect: "postgres",
        logging: false
    });



export default db;