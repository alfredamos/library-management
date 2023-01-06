import createError from "http-errors";
import { StatusCodes } from "http-status-codes";
import { User } from '../models/user.model';
import { userLoginValidation } from '../validations/user-login.validation';
import {Request, Response, NextFunction} from "express";

export const userLoginValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const {body: user}  = req;
    const userVar = user as User;
    const {error, value} = userLoginValidation(userVar);

    if (error) {        
        const errorMessage = error.details.map(err => err.message).join('. ');        

        throw createError(
          StatusCodes.BAD_REQUEST,
          `${JSON.stringify(errorMessage)} - please provide all required values`
        );
    }

    next();

    return value;
}