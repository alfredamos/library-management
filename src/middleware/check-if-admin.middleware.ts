import { StatusCodes } from "http-status-codes";
import catchError from "http-errors";
import { Response, Request, NextFunction } from "express";
import { UserType } from "@prisma/client";
import { UserInfo } from '../models/user-info.model';

export const checkIfAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req['user'] as UserInfo;

  if (user?.userType !== UserType.Admin) {
    throw catchError(
      StatusCodes.FORBIDDEN,
      "You are not authorized to perform this task."
    );
  }

  next();
};
