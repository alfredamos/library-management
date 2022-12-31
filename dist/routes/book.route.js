"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("../controllers/book.controller");
const book_validation_middleware_1 = require("../middleware/book-validation.middleware");
const router = express_1.default.Router();
router.route("/").get(book_controller_1.getAllBooks).post(book_validation_middleware_1.bookValidationMiddleware, book_controller_1.createBook);
router
    .route("/:id")
    .delete(book_controller_1.deleteBook)
    .get(book_controller_1.getBookById)
    .patch(book_validation_middleware_1.bookValidationMiddleware, book_controller_1.editBook);
exports.default = router;
