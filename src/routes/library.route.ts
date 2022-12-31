import express from "express";
import { checkIfAdmin } from "../middleware/check-if-admin.middleware";
import { checkIfAuthenticated } from "../middleware/check-if-authenticated";

import {
    createLibrary,
    deleteLibrary,
    editLibrary,
    getAllLibraries,
    getLibraryById
} from "../controllers/library.controller"

import { libraryValidationMiddleware } from "../middleware/library-validation.middleware";



const router = express.Router();

router.route('/')
    .get(checkIfAuthenticated, getAllLibraries)
    .post(libraryValidationMiddleware, checkIfAuthenticated, checkIfAdmin, createLibrary);

router.route('/:id')
    .delete(checkIfAuthenticated, checkIfAdmin, deleteLibrary)
    .get(checkIfAuthenticated, getLibraryById)
    .patch(libraryValidationMiddleware, checkIfAuthenticated, checkIfAdmin, editLibrary);

export default router;