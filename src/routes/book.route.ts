import express from "express";
import { checkIfAdmin } from "../middleware/check-if-admin.middleware";
import { checkIfAuthenticated } from "../middleware/check-if-authenticated";

import {
  createBook,
  deleteBook,
  editBook,
  getAllBooks,
  getBookById,
} from "../controllers/book.controller";

import { bookValidationMiddleware } from "../middleware/book-validation.middleware";

const router = express.Router();

router.route("/")
  .get(checkIfAuthenticated, getAllBooks)
  .post(bookValidationMiddleware, checkIfAuthenticated, checkIfAdmin, createBook);

router
  .route("/:id")
  .delete(checkIfAuthenticated, checkIfAdmin, deleteBook)
  .get(checkIfAuthenticated, getBookById)
  .patch(bookValidationMiddleware, checkIfAuthenticated, checkIfAdmin, editBook);

export default router;
