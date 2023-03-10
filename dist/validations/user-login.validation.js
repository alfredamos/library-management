"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const userSchema = joi_1.default.object().keys({
    email: joi_1.default.string().required().email(),
    password: joi_1.default.string().required(),
});
const userLoginValidation = (user) => {
    const { email, password } = user;
    return userSchema.validate({
        email,
        password
    }, { abortEarly: false });
};
exports.userLoginValidation = userLoginValidation;
