"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFound = void 0;
const http_status_codes_1 = require("http-status-codes");
const custom_error_error_1 = require("./custom-error.error");
class NotFound extends custom_error_error_1.CustomError {
    constructor(message) {
        super(message, http_status_codes_1.StatusCodes.NOT_FOUND);
        this.name = "NotFoundError";
    }
}
exports.NotFound = NotFound;
