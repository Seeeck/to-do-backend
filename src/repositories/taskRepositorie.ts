

import { Request, Response } from "express"
import { TaskInterface } from "./taskInterface";
import ApiResponse from "../helpers/apiResponse";
import { Task } from "../models/task";
class TaskRepositorie implements TaskInterface {


    async createTask(req: Request, res: Response) {

        try {

            const request = {
                user_id: req.body.user_id,
                task_title: req.body.task_title,
                task_description: req.body.task_description,
                finished_task: false,
                task_day: Date()
            };

            const existsTask = await Task.findOne({ where: { user_id: request.user_id, task_title: request.task_title } });

            if (existsTask) {
                return ApiResponse.errorResponse({ res: res, message: "task already exists.", code: 409 })
            }
            const task_instance = Task.build(request)

            await task_instance.save();

            return ApiResponse.successResponse({ res: res, code: 200, message: `Task ${request.task_title} saved.` });
        } catch (error: any) {


            return ApiResponse.errorResponse({ res: res, error: error, code: 500 })
        }
    }

    async listTask(req: Request, res: Response) {
        try {
            const request = {
                user_id: req.body.user_id,
                offset: req.body.offset,
                limit: req.body.limit

            };
            const tasks_data = await Task.findAndCountAll({
                offset: request.offset,
                limit: request.limit,
                where: {
                    user_id: request.user_id
                }
            });

            return ApiResponse.successResponse({ res: res, code: 200, data: tasks_data });
        } catch (error: any) {
            return ApiResponse.errorResponse({ res: res, error: error, code: 500 })
        }

    }

    updateTask(request: Request, response: Response) {
        return response;
    }
    deleteTask(request: Request, response: Response) {
        return response;
    }


}

export default TaskRepositorie;