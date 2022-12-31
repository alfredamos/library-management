import createError from "http-errors";
import { StatusCodes } from "http-status-codes";
import { Library } from '../models/library.model';
import { libraryValidation } from '../validations/library.validation';
import {Request, Response, NextFunction} from "express";

export const libraryValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const {body: library}  = req;
    const libraryVar = library as Library;
    const {error, value} = libraryValidation(libraryVar);

    if (error) {
        const errorMessage = Object.values(error.details).map(err => err.message).join('. ');        

        throw createError(StatusCodes.BAD_REQUEST, `${errorMessage} - please provide all required values`);
    }

    next();

    return value;
}