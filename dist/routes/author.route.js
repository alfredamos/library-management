"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const check_if_admin_middleware_1 = require("../middleware/check-if-admin.middleware");
const check_if_authenticated_1 = require("../middleware/check-if-authenticated");
const author_controller_1 = require("../controllers/author.controller");
const author_validation_middleware_1 = require("../middleware/author-validation.middleware");
const router = express_1.default.Router();
router.route('/')
    .get(check_if_authenticated_1.checkIfAuthenticated, author_controller_1.getAllAuthors)
    .post(author_validation_middleware_1.authorValidationMiddleware, check_if_authenticated_1.checkIfAuthenticated, check_if_admin_middleware_1.checkIfAdmin, author_controller_1.createAuthor);
router.route('/:id')
    .delete(check_if_authenticated_1.checkIfAuthenticated, check_if_admin_middleware_1.checkIfAdmin, author_controller_1.deleteAuthor)
    .get(check_if_authenticated_1.checkIfAuthenticated, author_controller_1.getAuthorById)
    .patch(author_validation_middleware_1.authorValidationMiddleware, check_if_authenticated_1.checkIfAuthenticated, check_if_admin_middleware_1.checkIfAdmin, author_controller_1.editAuthor);
exports.default = router;
