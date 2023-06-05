"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiResponse {
    static successResponse(res, data, code = 200) {
        return res.status(code).json({
            success: {
                codeResponse: 1,
                responseDescription: data,
            },
            code: code,
        });
    }
    static errorResponse(res, message, code = 500) {
        return res.status(code).json({
            error: {
                codeResponse: 0,
                responseDescription: 'error',
                responseDetail: message,
            },
            code: code,
        });
    }
}
exports.default = ApiResponse;
