import { Response, Request } from "express";
import { TaskInterface } from "../repositories/taskInterface";


class TaskController implements TaskInterface {




    private tasks;

    constructor(taskInterface:TaskInterface)
    {
        this.tasks = taskInterface;
    }

    createTask(request: Request,response: Response) {
        return this.tasks.createTask(request,response);
    }

    listTask(request: Request, response: Response) {
        return this.tasks.listTask(request,response);
    }

    updateTask(request: Request, response: Response) {
        return this.tasks.updateTask(request,response);
    }

    deleteTask(request: Request, response: Response) {
        return this.tasks.deleteTask(request,response);
    }



}

export default TaskController;