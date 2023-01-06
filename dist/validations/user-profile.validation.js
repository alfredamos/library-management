"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfileValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const userSchema = joi_1.default.object().keys({
    fullName: joi_1.default.string().required(),
    email: joi_1.default.string().required().email(),
    phone: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    newPassword: joi_1.default.string().required(),
    departmentId: joi_1.default.string().required(),
});
const userProfileValidation = (user) => {
    const { fullName, email, phone, departmentId, password, newPassword } = user;
    return userSchema.validate({
        fullName,
        email,
        phone,
        departmentId,
        password,
        newPassword,
    }, { abortEarly: false });
};
exports.userProfileValidation = userProfileValidation;
