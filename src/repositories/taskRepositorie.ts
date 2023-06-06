

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

            const existsTask = await Task.findOne({
                where: {
                    user_id: request.user_id,
                    task_title: request.task_title
                }
            });

            if (existsTask) {
                return ApiResponse.errorResponse(
                    {
                        res: res,
                        message: `Task '${request.task_title}' already exists.`,
                        code: 409
                    })
            }
            const task_instance = Task.build(request)

            const task_saved = await task_instance.save();

            return ApiResponse.successResponse({
                res: res,
                code: 200,
                message: `Task saved.`,
                data: task_saved
            });
        } catch (error: any) {


            return ApiResponse.errorResponse({
                res: res,
                error: error,
                code: 500
            })
        }
    }

    async listTaskByUser(req: Request, res: Response) {

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

            return ApiResponse.successResponse({
                res: res,
                code: 200,
                data: tasks_data
            });

        } catch (error: any) {

            return ApiResponse.errorResponse({
                res: res,
                error: error,
                code: 500
            })
        }

    }

    async updateTask(req: Request, res: Response) {

        try {
            const request = {
                task_id: req.body.task_id,
                user_id: req.body.user_id,
                task_title: req.body?.task_title,
                task_description: req.body?.task_description,
                task_day: req.body?.task_day,
                finished_task: req.body?.finished_task
            };

            const existsTask = await Task.findOne({
                where: {
                    user_id: request.user_id,
                    id: request.task_id
                }
            });



            if (!existsTask) {
                return ApiResponse.errorResponse({
                    res: res,
                    message: "The task could not be found.",
                    code: 404
                })
            }

            const task_updated = await Task.update({
                task_title: request?.task_title,
                task_description: request?.task_description,
                task_day: request?.task_day,
                finished_task: request?.finished_task
            }, {
                where: {
                    id: request.task_id,
                    user_id: request.user_id
                }
            });


            if (task_updated > [0]) {
                return ApiResponse.successResponse({
                    res: res,
                    code: 200,
                    message: `Task updated.`,
                    data: request
                });
            } else {
                return ApiResponse.errorResponse({
                    res: res,
                    message: "The data could not be updated.",
                    code: 404
                })
            }

        } catch (error: any) {
            return ApiResponse.errorResponse({
                res: res,
                error: error,
                code: 500
            })
        }

    }

    async deleteTask(req: Request, res: Response) {

        try {

            const request = {
                task_id: req.body.task_id,
                user_id: req.body.user_id,

            };

            const existsTask = await Task.findOne({
                where: {
                    user_id: request.user_id,
                    id: request.task_id
                }
            });



            if (!existsTask) {
                return ApiResponse.errorResponse({
                    res: res,
                    message: "The task could not be found.",
                    code: 404
                })
            }

            const task_deleted = await Task.destroy({
                where: {
                    id: request.task_id,
                    user_id: request.user_id
                }
            });

            if (task_deleted) {
                console.log('deleteado res:', res, ' ');
                return ApiResponse.successResponse({
                    res: res,
                    code: 200,
                    message: `Task deleted.`,
                    data: request
                });

            } else {
                return ApiResponse.errorResponse({
                    res: res,
                    message: "task could not be deleted.",
                    code: 500
                });
            }


        } catch (error: any) {
            return ApiResponse.errorResponse({
                res: res,
                error: error,
                code: 500
            });
        };

    }
}

export default TaskRepositorie;