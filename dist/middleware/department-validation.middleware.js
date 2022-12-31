"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.departmentValidationMiddleware = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = require("http-status-codes");
const department_validation_1 = require("../validations/department.validation");
const departmentValidationMiddleware = (req, res, next) => {
    const { body: department } = req;
    const departmentVar = department;
    const { error, value } = (0, department_validation_1.departmentValidation)(departmentVar);
    if (error) {
        const errorMessage = Object.values(error.details).map(err => err.message).join('. ');
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, `${errorMessage} - please provide all required values`);
    }
    next();
    return value;
};
exports.departmentValidationMiddleware = departmentValidationMiddleware;
