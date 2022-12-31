import express from "express";
import { checkIfAdmin } from "../middleware/check-if-admin.middleware";
import { checkIfAuthenticated } from "../middleware/check-if-authenticated";

import {
    createAuthor,
    deleteAuthor,
    editAuthor,
    getAllAuthors,
    getAuthorById
} from "../controllers/author.controller"

import { authorValidationMiddleware } from "../middleware/author-validation.middleware";



const router = express.Router();

router.route('/')
    .get(checkIfAuthenticated, getAllAuthors)
    .post(authorValidationMiddleware, checkIfAuthenticated, checkIfAdmin, createAuthor);

router.route('/:id')
    .delete(checkIfAuthenticated, checkIfAdmin, deleteAuthor)
    .get(checkIfAuthenticated, getAuthorById)
    .patch(authorValidationMiddleware, checkIfAuthenticated, checkIfAdmin, editAuthor);

export default router;