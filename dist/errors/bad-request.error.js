"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequest = void 0;
const http_status_codes_1 = require("http-status-codes");
const custom_error_error_1 = require("./custom-error.error");
class BadRequest extends custom_error_error_1.CustomError {
    constructor(message) {
        super(message, http_status_codes_1.StatusCodes.BAD_REQUEST);
        this.name = "BadRequestError";
    }
}
exports.BadRequest = BadRequest;
