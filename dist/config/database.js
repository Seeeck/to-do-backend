"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const task_1 = require("../models/task");
const db = new sequelize_1.Sequelize('to_do_database', "seck", "seck123456", {
    host: "to-do-instance.cn7g4pvobdw4.sa-east-1.rds.amazonaws.com",
    port: 5432,
    dialect: "postgres",
    logging: false
});
task_1.Task.initTable(db);
exports.default = db;
