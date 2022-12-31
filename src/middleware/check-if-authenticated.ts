import * as jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import catchError from "http-errors";
import { StatusCodes } from 'http-status-codes';

export const checkIfAuthenticated = (req: Request, res: Response, next: NextFunction) =>{
    const authJsonToken = req?.headers?.authorization?.split(' ')[1];

    if (!authJsonToken){
        throw catchError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
    }

    checkJwtToken(authJsonToken)
       .then(user => {
            req['user'] = user;
            next();
    })
    .catch(err => {
        throw catchError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
    });
    
    next();

};

async function checkJwtToken(tokenToVerify: string){
    return await jwt.verify(tokenToVerify, process.env.JSON_TOKEN_KEY);
}

