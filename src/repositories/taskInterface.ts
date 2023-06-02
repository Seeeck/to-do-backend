import { Request, Response } from "express";


//Sirve como regla para recibir un request y devolver un response
export interface TaskInterface {
   createTask(request:Request,response:Response):Response;
   listTask(request:Request,response:Response):Response;
   updateTask(request:Request,response:Response):Response;
   deleteTask(request:Request,response:Response):Response; 
}

