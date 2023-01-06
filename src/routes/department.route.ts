import express from "express";
import { checkIfAdmin } from "../middleware/check-if-admin.middleware";
import { checkIfAuthenticated } from "../middleware/check-if-authenticated";

import {
    createDepartment,
    deleteDepartment,
    editDepartment,
    getAllDepartments,
    getDepartmentById
} from "../controllers/department.controller"

import { departmentValidationMiddleware } from "../middleware/department-validation.middleware";



const router = express.Router();

router.route('/')
    //.get(checkIfAuthenticated, getAllDepartments)
    .get(getAllDepartments)
    .post(departmentValidationMiddleware, checkIfAuthenticated, checkIfAdmin, createDepartment);

router.route('/:id')
    .delete(checkIfAuthenticated, checkIfAdmin, deleteDepartment)
    .get(checkIfAuthenticated, getDepartmentById)
    .patch(departmentValidationMiddleware, checkIfAuthenticated, checkIfAdmin, editDepartment);

export default router;