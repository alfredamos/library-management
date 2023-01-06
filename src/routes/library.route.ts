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
import { checKCanLibraryModify } from '../middleware/check-can-library-modify.middleware';



const router = express.Router();

router.route('/')
    .get(checkIfAuthenticated, getAllLibraries)
    .post(libraryValidationMiddleware, checkIfAuthenticated, createLibrary);

router.route('/:id')
    .delete(checkIfAuthenticated, checKCanLibraryModify, deleteLibrary)
    .get(checkIfAuthenticated, getLibraryById)
    .patch(libraryValidationMiddleware, checkIfAuthenticated, checKCanLibraryModify, editLibrary);

export default router;