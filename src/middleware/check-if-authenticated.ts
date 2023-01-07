import * as jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import catchError from "http-errors";
import { StatusCodes } from "http-status-codes";

export const checkIfAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authJsonToken = req?.headers?.authorization?.split(" ")[1];

  if (!authJsonToken) {
    next(catchError(StatusCodes.FORBIDDEN, "Invalid credentials"));
    return;
  }

  checkJwtToken(authJsonToken)
    .then((user) => {
      req["user"] = user;

      next();
      return;
    })
    .catch((err) => {
      next(catchError(StatusCodes.FORBIDDEN, "Invalid credentials"));
      return;
    });

 
};

async function checkJwtToken(tokenToVerify: string) {
  return await jwt.verify(tokenToVerify, process.env.JWT_TOKEN_SECRET);
}
