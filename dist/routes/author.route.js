"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const author_controller_1 = require("../controllers/author.controller");
const author_validation_middleware_1 = require("../middleware/author-validation.middleware");
const router = express_1.default.Router();
router.route('/')
    .get(author_controller_1.getAllAuthors)
    .post(author_validation_middleware_1.authorValidationMiddleware, author_controller_1.createAuthor);
router.route('/:id')
    .delete(author_controller_1.deleteAuthor)
    .get(author_controller_1.getAuthorById)
    .patch(author_validation_middleware_1.authorValidationMiddleware, author_controller_1.editAuthor);
exports.default = router;
