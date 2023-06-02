import { Response, Request } from "express"
import TaskController from "../controllers/taskController"
import TaskRepositorie from "../repositories/taskRepositorie"

const express = require('express')
const taskRoute = express.Router()
const task_repositorie = new TaskRepositorie();
const task_controller = new TaskController(task_repositorie);


//Crear tarea
//Request:-nombre tarea
//        -descripcion tarea
//        -dia de la tarea

//Validaciones:-El dia no puede ser antes del actual
//             -El nombre debe tener 40 caracteres maximo minimo 4
//             -La descripcion debe tener 250 caracteres, opcional

taskRoute.post('/create-task', (req: Request, res: Response) => {
    return task_controller.createTask(req, res);
})

taskRoute.get('/list-task', (req: Request, res: Response) => {
    return task_controller.listTask(req, res);
})

taskRoute.get('/update-task', (req: Request, res: Response) => {
    return task_controller.updateTask(req, res);
})

taskRoute.get('/delete-task', (req: Request, res: Response) => {
    return task_controller.deleteTask(req, res);
})

module.exports = taskRoute;