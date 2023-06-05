import { Request, Response } from "express";

//Sirve como regla para recibir un request y devolver un response
export interface TaskInterface {
   createTask(request: Request, response: Response): Promise<Response>;
   listTaskByUser(request: Request, response: Response): Promise<Response>;
   updateTask(request: Request, response: Response):Promise<Response>;
   deleteTask(request: Request, response: Response):Promise<Response>;
}

