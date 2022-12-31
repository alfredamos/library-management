"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorValidationMiddleware = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = require("http-status-codes");
const author_validation_1 = require("../validations/author.validation");
const authorValidationMiddleware = (req, res, next) => {
    const { body: author } = req;
    const authorVar = author;
    const { error, value } = (0, author_validation_1.authorValidation)(authorVar);
    if (error) {
        const errorMessage = Object.values(error.details).map(err => err.message).join('. ');
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, `${errorMessage} - please provide all required values`);
    }
    next();
    return value;
};
exports.authorValidationMiddleware = authorValidationMiddleware;
