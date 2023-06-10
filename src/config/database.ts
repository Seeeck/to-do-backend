import { Sequelize } from "sequelize"
require('dotenv').config();




const db = new Sequelize(
    process.env.DB_DATABASE ?? '',
    process.env.DB_USER ?? '',
    process.env.DB_PASSWORD ?? '',
    {
        host: process.env.DB_HOST ?? '',
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 0,
        dialect: "postgres",
        logging: false
    });



export default db;