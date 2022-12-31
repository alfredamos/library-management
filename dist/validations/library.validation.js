"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.libraryValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const librarySchema = joi_1.default.object().keys({
    userId: joi_1.default.string().required(),
    bookId: joi_1.default.string().required(),
});
const libraryValidation = (library) => {
    const { userId, bookId, } = library;
    return librarySchema.validate({
        userId,
        bookId,
    }, { abortEarly: false });
};
exports.libraryValidation = libraryValidation;
