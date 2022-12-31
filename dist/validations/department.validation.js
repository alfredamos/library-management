"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.departmentValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const departmentSchema = joi_1.default.object().keys({
    name: joi_1.default.string().required(),
    faculty: joi_1.default.string().required(),
});
const departmentValidation = (department) => {
    const { name, faculty } = department;
    return departmentSchema.validate({ name, faculty }, { abortEarly: false });
};
exports.departmentValidation = departmentValidation;
