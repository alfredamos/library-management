import createError from "http-errors";
import { StatusCodes } from "http-status-codes";
import { Author } from '../models/author.model';
import { authorValidation } from '../validations/author.validation';
import {Request, Response, NextFunction} from "express";

export const authorValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const {body: author}  = req;
    const authorVar = author as Author;
    const {error, value} = authorValidation(authorVar);

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