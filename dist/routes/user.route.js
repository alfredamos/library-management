"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const user_validation_middleware_1 = require("../middleware/user-validation.middleware");
const router = express_1.default.Router();
router.route('/')
    .get(user_controller_1.getAllUsers)
    .post(user_validation_middleware_1.userValidationMiddleware, user_controller_1.createUser);
router.route('/:id')
    .delete(user_controller_1.deleteUser)
    .get(user_controller_1.getUserById)
    .patch(user_validation_middleware_1.userValidationMiddleware, user_controller_1.editUser);
exports.default = router;
