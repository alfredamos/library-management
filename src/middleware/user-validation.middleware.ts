import createError from "http-errors";
import { StatusCodes } from "http-status-codes";
import { User } from '../models/user.model';
import { userValidation } from '../validations/user.validation';
import {Request, Response, NextFunction} from "express";

export const userValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const {body: user}  = req;
    const userVar = user as User;
    const {error, value} = userValidation(userVar);

    if (error) {        
        const errorMessage = Object.values(error.details).map(err => err.message).join('. ');        

        throw createError(StatusCodes.BAD_REQUEST, `${errorMessage} - please provide all required values`);
    }

    next();

    return value;
}