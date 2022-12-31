"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const authorSchema = joi_1.default.object().keys({
    name: joi_1.default.string().required(),
});
const authorValidation = (author) => {
    const { name } = author;
    return authorSchema.validate({ name }, { abortEarly: false });
};
exports.authorValidation = authorValidation;
