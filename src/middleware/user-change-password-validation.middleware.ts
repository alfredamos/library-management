import createError from "http-errors";
import { StatusCodes } from "http-status-codes";
import { UserChangePassword } from "../models/user-change-password.model";
import { userChangePasswordValidation } from "../validations/user-change-password.validation";
import { Request, Response, NextFunction } from "express";

export const userChangePasswordValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body: user } = req;
  const userVar = user as UserChangePassword;
  const { error, value } = userChangePasswordValidation(userVar);

  if (error) {
    const errorMessage = error.details.map((err) => err.message).join(". ");

    throw createError(
      StatusCodes.BAD_REQUEST,
      `${JSON.stringify(errorMessage)} - please provide all required values`
    );
  }

  next();

  return value;
};
