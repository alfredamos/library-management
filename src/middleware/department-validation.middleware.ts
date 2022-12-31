import createError from "http-errors";
import { StatusCodes } from "http-status-codes";
import { Department } from '../models/department.model';
import { departmentValidation } from '../validations/department.validation';
import {Request, Response, NextFunction} from "express";

export const departmentValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const {body: department}  = req;
    const departmentVar = department as Department;
    const {error, value} = departmentValidation(departmentVar);

    if (error) {
        const errorMessage = Object.values(error.details).map(err => err.message).join('. ');        

        throw createError(StatusCodes.BAD_REQUEST, `${errorMessage} - please provide all required values`);
    }

    next();

    return value;
}