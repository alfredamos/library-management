import express from "express";

import {
    createUser,
    deleteUser,
    editUser,
    getAllUsers,
    getUserById
} from "../controllers/user.controller"

import { checkIfAdmin } from "../middleware/check-if-admin.middleware";
import { checkIfAuthenticated } from "../middleware/check-if-authenticated";

import { userValidationMiddleware } from "../middleware/user-validation.middleware";



const router = express.Router();

router.route('/')
    .get(checkIfAuthenticated,getAllUsers)
    .post(userValidationMiddleware, checkIfAuthenticated, checkIfAdmin, createUser);

router.route('/:id')
    .delete(checkIfAuthenticated, checkIfAdmin, deleteUser)
    .get(checkIfAuthenticated, getUserById)
    .patch(userValidationMiddleware, checkIfAuthenticated, checkIfAdmin, editUser);

export default router;