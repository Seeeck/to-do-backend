import { Request, Response } from "express";

import { TaskInterface } from "./taskInterface";

import ApiResponse from "../helpers/apiResponse";

class TaskRepositorie implements TaskInterface {


    createTask(request: Request, response: Response) {
      ;
        try {
            return ApiResponse.successResponse(response, {}, 202);
        } catch (e) {
            return ApiResponse.errorResponse(response, "task creation error", 505)
        }
    }

    listTask(request: Request, response: Response) {
        return response;
    }

    updateTask(request: Request, response: Response) {
        return response;
    }
    deleteTask(request: Request, response: Response) {
        return response;
    }


}

export default TaskRepositorie;