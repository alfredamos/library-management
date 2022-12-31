import express from "express";

import {
    createUser,
    deleteUser,
    editUser,
    getAllUsers,
    getUserById
} from "../controllers/user.controller"

import { userValidationMiddleware } from "../middleware/user-validation.middleware";



const router = express.Router();

router.route('/')
    .get(getAllUsers)
    .post(userValidationMiddleware, createUser);

router.route('/:id')
    .delete(deleteUser)
    .get(getUserById)
    .patch(userValidationMiddleware, editUser);

export default router;