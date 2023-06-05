"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { validationResult } = require('express-validator');
const requestValidationMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ code: 422, message: 'Request error', errors: errors.array() });
    }
    next();
};
exports.default = requestValidationMiddleware;
