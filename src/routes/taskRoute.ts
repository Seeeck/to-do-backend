import { Response, Request, Router } from "express"
import TaskController from "../controllers/taskController"
import TaskRepositorie from "../repositories/taskRepositorie"
import { checkSchema, } from "express-validator"
import createTaskSchema from "../schemas/createTaskSchema"
import requestValidationMiddleware from "../middlewares/requestValidationMiddleware"
import listTaskSchema from "../schemas/listTaskSchema"
import { updateTaskSchema, oneOfUpdateTask } from "../schemas/updateTaskSchema"
import deleteTaskSchema from "../schemas/deleteTaskSchema"
import { verifyToken } from "../middlewares/authMiddleware"


const taskRoute = Router();
const task_repositorie = new TaskRepositorie();
const task_controller = new TaskController(task_repositorie);


taskRoute.post(
    '/create-task',
    checkSchema(createTaskSchema),
    requestValidationMiddleware,
    verifyToken,
    (req: Request, res: Response) => {
        return task_controller.createTask(req, res);
    }
)

taskRoute.get(
    '/list-task',
    checkSchema(listTaskSchema),
    requestValidationMiddleware,
    verifyToken,
    (req: Request, res: Response) => {
        return task_controller.listTaskByUser(req, res);
    }
)

taskRoute.put(
    '/update-task',
    checkSchema(updateTaskSchema),
    oneOfUpdateTask(),
    requestValidationMiddleware,
    verifyToken,
    (req: Request, res: Response) => {
        return task_controller.updateTask(req, res);
    }
)

taskRoute.delete(
    '/delete-task',
    checkSchema(deleteTaskSchema),
    verifyToken,
    (req: Request, res: Response) => {
        return task_controller.deleteTask(req, res);
    }
)

module.exports = taskRoute;