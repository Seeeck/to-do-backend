import { Response } from "express";

class ApiResponse {

    static successResponse(response: { res: Response, code: number, data?: any, message?: string }) {
        return response.res.status(response.code).json({
         
            code: response.code ? response.code : 200,
            message: response.message,
            data: response.data,
          
        });
    }

    static errorResponse(error: { res: Response, error?: any, message?: string, code: number }) {
        //
        const errors = error?.error?.errors?.map((e: any) => {
            return {
                "message": e.message,
                "type": e.type,
                "origin": e.origin
            }
        });

        return error.res.status(error.code).json({
            code: error.code,
            message: error?.message,
            error: errors,

        });
    }
}

export default ApiResponse;