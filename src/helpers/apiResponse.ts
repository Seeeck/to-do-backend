import { Response } from "express";

class ApiResponse {
    static successResponse(res: Response, data: any, code: number = 200) {
        return res.status(code).json({
            success: {
                codigoRespuesta: 1,
                descripcionRespuesta: data,
            },
            codigo: code,
        });
    }

    static errorResponse(res: Response, message: string, code: number = 500) {
        return res.status(code).json({
            error: {
                codigoRespuesta: 0,
                descripcionRespuesta: 'Error',
                detalleRespuesta: message,
            },
            codigo: code,
        });
    }
}

export default ApiResponse;