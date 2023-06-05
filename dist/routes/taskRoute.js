"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const taskController_1 = __importDefault(require("../controllers/taskController"));
const taskRepositorie_1 = __importDefault(require("../repositories/taskRepositorie"));
const express_validator_1 = require("express-validator");
const createTaskSchema_1 = __importDefault(require("../schemas/createTaskSchema"));
const requestValidationMiddleware_1 = __importDefault(require("../middlewares/requestValidationMiddleware"));
const express = require('express');
const taskRoute = express.Router();
const task_repositorie = new taskRepositorie_1.default();
const task_controller = new taskController_1.default(task_repositorie);
//Crear tarea
//Request:-nombre tarea
//        -descripcion tarea
//        -dia de la tarea
//Validaciones:-El dia no puede ser antes del actual
//             -El nombre debe tener 40 caracteres maximo minimo 4
//             -La descripcion debe tener 250 caracteres, opcional
taskRoute.post('/create-task', (0, express_validator_1.checkSchema)(createTaskSchema_1.default), requestValidationMiddleware_1.default, (req, res) => {
    return task_controller.createTask(req, res);
});
taskRoute.get('/list-task', (req, res) => {
    console.log('listing tasks...');
    return task_controller.listTask(req, res);
});
taskRoute.get('/update-task', (req, res) => {
    return task_controller.updateTask(req, res);
});
taskRoute.get('/delete-task', (req, res) => {
    return task_controller.deleteTask(req, res);
});
module.exports = taskRoute;
