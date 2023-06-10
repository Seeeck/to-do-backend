

import { Request, Response } from "express"
import { TaskInterface } from "./taskInterface";
import ApiResponse from "../helpers/apiResponse";
import { Task } from "../models/task";
class TaskRepositorie implements TaskInterface {

//implementar transacciones
    async createTask(req: Request, res: Response) {

        try {
            const body = {
                user_id: req.body.user_id,
                task_title: req.body.task_title,
                task_description: req.body.task_description,
                finished_task: false,
                task_day: Date()
            };

            const existsTask = await Task.findOne({
                where: {
                    user_id: body.user_id,
                    task_title: body.task_title
                }
            });

            if (existsTask) {
                return ApiResponse.errorResponse(
                    {
                        res: res,
                        message: `Task '${body.task_title}' already exists.`,
                        code: 409
                    })
            }
            const task_instance = Task.build(body)

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
            const body = {
                user_id: req.body.user_id,
                offset: req.body.offset,
                limit: req.body.limit

            };

            const tasks_data = await Task.findAndCountAll({
                offset: body.offset,
                limit: body.limit,
                where: {
                    user_id: body.user_id
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
            const body = {
                task_id: req.body.task_id,
                user_id: req.body.user_id,
                task_title: req.body?.task_title,
                task_description: req.body?.task_description,
                task_day: req.body?.task_day,
                finished_task: req.body?.finished_task
            };

            const existsTask = await Task.findOne({
                where: {
                    user_id: body.user_id,
                    id: body.task_id
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
                task_title: body?.task_title,
                task_description: body?.task_description,
                task_day: body?.task_day,
                finished_task: body?.finished_task
            }, {
                where: {
                    id: body.task_id,
                    user_id: body.user_id
                }
            });


            if (task_updated > [0]) {
                return ApiResponse.successResponse({
                    res: res,
                    code: 200,
                    message: `Task updated.`,
                    data: body
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

            const body = {
                task_id: req.body.task_id,
                user_id: req.body.user_id,

            };

            const existsTask = await Task.findOne({
                where: {
                    user_id: body.user_id,
                    id: body.task_id
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
                    id: body.task_id,
                    user_id: body.user_id
                }
            });

            if (task_deleted) {
                console.log('deleteado res:', res, ' ');
                return ApiResponse.successResponse({
                    res: res,
                    code: 200,
                    message: `Task deleted.`,
                    data: body
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