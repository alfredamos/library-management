"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const check_if_admin_middleware_1 = require("../middleware/check-if-admin.middleware");
const check_if_authenticated_1 = require("../middleware/check-if-authenticated");
const user_validation_middleware_1 = require("../middleware/user-validation.middleware");
const router = express_1.default.Router();
router.route('/')
    .get(check_if_authenticated_1.checkIfAuthenticated, user_controller_1.getAllUsers)
    .post(user_validation_middleware_1.userValidationMiddleware, check_if_authenticated_1.checkIfAuthenticated, check_if_admin_middleware_1.checkIfAdmin, user_controller_1.createUser);
router.route('/:id')
    .delete(check_if_authenticated_1.checkIfAuthenticated, check_if_admin_middleware_1.checkIfAdmin, user_controller_1.deleteUser)
    .get(check_if_authenticated_1.checkIfAuthenticated, user_controller_1.getUserById)
    .patch(user_validation_middleware_1.userValidationMiddleware, check_if_authenticated_1.checkIfAuthenticated, check_if_admin_middleware_1.checkIfAdmin, user_controller_1.editUser);
exports.default = router;
