"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginValidationMiddleware = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = require("http-status-codes");
const user_login_validation_1 = require("../validations/user-login.validation");
const userLoginValidationMiddleware = (req, res, next) => {
    const { body: user } = req;
    const userVar = user;
    const { error, value } = (0, user_login_validation_1.userLoginValidation)(userVar);
    if (error) {
        const errorMessage = error.details.map(err => err.message).join('. ');
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, `${JSON.stringify(errorMessage)} - please provide all required values`);
    }
    next();
    return value;
};
exports.userLoginValidationMiddleware = userLoginValidationMiddleware;
