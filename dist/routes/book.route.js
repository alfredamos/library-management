"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const check_if_admin_middleware_1 = require("../middleware/check-if-admin.middleware");
const check_if_authenticated_1 = require("../middleware/check-if-authenticated");
const book_controller_1 = require("../controllers/book.controller");
const book_validation_middleware_1 = require("../middleware/book-validation.middleware");
const router = express_1.default.Router();
router.route("/")
    .get(check_if_authenticated_1.checkIfAuthenticated, book_controller_1.getAllBooks)
    .post(book_validation_middleware_1.bookValidationMiddleware, check_if_authenticated_1.checkIfAuthenticated, check_if_admin_middleware_1.checkIfAdmin, book_controller_1.createBook);
router
    .route("/:id")
    .delete(check_if_authenticated_1.checkIfAuthenticated, check_if_admin_middleware_1.checkIfAdmin, book_controller_1.deleteBook)
    .get(check_if_authenticated_1.checkIfAuthenticated, book_controller_1.getBookById)
    .patch(book_validation_middleware_1.bookValidationMiddleware, check_if_authenticated_1.checkIfAuthenticated, check_if_admin_middleware_1.checkIfAdmin, book_controller_1.editBook);
exports.default = router;
