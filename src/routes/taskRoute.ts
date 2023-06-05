import { Response, Request, Router } from "express"
import TaskController from "../controllers/taskController"
import TaskRepositorie from "../repositories/taskRepositorie"
import { checkSchema, } from "express-validator"
import createTaskSchema from "../schemas/createTaskSchema"
import requestValidationMiddleware from "../middlewares/requestValidationMiddleware"
import listTaskSchema from "../schemas/listTaskSchema"
import { updateTaskSchema, oneOfUpdateTask } from "../schemas/updateTaskSchema"
import deleteTaskSchema from "../schemas/deleteTaskSchema"

const express = require('express');
const taskRoute = Router();
const task_repositorie = new TaskRepositorie();
const task_controller = new TaskController(task_repositorie);


//Crear tarea
//Request:-nombre tarea
//        -descripcion tarea
//        -dia de la tarea

//Validaciones:-El dia no puede ser antes del actual
//             -El nombre debe tener 40 caracteres maximo minimo 4
//             -La descripcion debe tener 250 caracteres, opcional

taskRoute.post(
    '/create-task',
    checkSchema(createTaskSchema),
    requestValidationMiddleware,
    (req: Request, res: Response) => {
        return task_controller.createTask(req, res);
    }
)

taskRoute.get(
    '/list-task',
    checkSchema(listTaskSchema),
    requestValidationMiddleware,
    (req: Request, res: Response) => {
        return task_controller.listTaskByUser(req, res);
    }
)

taskRoute.put(
    '/update-task',
    checkSchema(updateTaskSchema),
    oneOfUpdateTask(),
    requestValidationMiddleware,
    (req: Request, res: Response) => {
        return task_controller.updateTask(req, res);
    }
)

taskRoute.delete(
    '/delete-task',
    checkSchema(deleteTaskSchema),
    (req: Request, res: Response) => {
        return task_controller.deleteTask(req, res);
    }
)

module.exports = taskRoute;