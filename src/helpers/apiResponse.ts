import { Response } from "express";

class ApiResponse {
    static successResponse(res: Response, data: any, code: number = 200) {
        return res.status(code).json({
            success: {
                codeResponse: 1,
                responseDescription: data,
            },
            code: code,
        });
    }

    static errorResponse(res: Response, message: string, code: number = 500) {
        return res.status(code).json({
            error: {
                codeResponse: 0,
                responseDescription: 'Error',
                responseDetail: message,
            },
            code: code,
        });
    }
}

export default ApiResponse;