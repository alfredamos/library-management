"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.libraryValidationMiddleware = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = require("http-status-codes");
const library_validation_1 = require("../validations/library.validation");
const libraryValidationMiddleware = (req, res, next) => {
    const { body: library } = req;
    const libraryVar = library;
    const { error, value } = (0, library_validation_1.libraryValidation)(libraryVar);
    if (error) {
        const errorMessage = error.details.map(err => err.message).join('. ');
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, `${JSON.stringify(errorMessage)} - please provide all required values`);
    }
    next();
    return value;
};
exports.libraryValidationMiddleware = libraryValidationMiddleware;
