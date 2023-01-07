import catchError from "http-errors";
import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/user.model";
import { UserChangePassword } from "../models/user-change-password.model";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { UserInfo } from "../models/user-info.model";
import { UserType } from "@prisma/client";
import { UuidTool } from "uuid-tool";


const prisma = new PrismaClient();


const loginUser = async (req: Request, res: Response) => {
  const { body: loginUser } = req;

  const userToLogin = loginUser as User;
  const { email, password } = userToLogin;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw catchError(StatusCodes.BAD_REQUEST, "Invalid credentials");
  }

  const hashedPassword = user.password;

  const isValid = await bcrypt.compare(password, hashedPassword);

  if (!isValid) {
    throw catchError(StatusCodes.BAD_REQUEST, "Invalid credentials");
  }

  const token = await createJsonWebToken(user.id, user.fullName, user.userType);

  const userInfo: UserInfo = {
    id: user.id,
    fullName: user.fullName,
    userType: user.userType,
    token,
  };

  res.status(StatusCodes.OK).json(userInfo);
};


const changePasswordOfUser = async (req: Request, res: Response) => {
  const { body: userChangePwd } = req;

  const userChangePassword = userChangePwd as UserChangePassword;
  const { email, oldPassword, newPassword, confirmPassword } =
    userChangePassword;

  //----> New password must match the confirm password.
  if (newPassword.normalize() !== confirmPassword.normalize()) {
    throw catchError(
      StatusCodes.BAD_REQUEST,
      "new password does not match confirm password."
    );
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw catchError(StatusCodes.BAD_REQUEST, "Invalid credentials");
  }

  //----> Retrieve the old password from database
  const hashedPassword = user.password;

  const isValid = await bcrypt.compare(oldPassword, hashedPassword); //----> Compare the old password with the password stored in the database.

  //----> Check the validity of password.
  if (!isValid) {
    throw catchError(StatusCodes.BAD_REQUEST, "Invalid credentials");
  }

  //----> Hash the new password.
  const newHashedPassword = await bcrypt.hash(newPassword, 10);

  //----> Store the new password in the database.
  const updatedUser = await prisma.user.update({
    where: { email },
    data: { ...user, password: newHashedPassword },
  });

  //----> Make a user object information.
  const userInfo: UserInfo = {
    id: updatedUser.id,
    fullName: updatedUser.fullName,
    userType: updatedUser.userType,
    message: "Password is changed successfully, please login.",
  };

  //----> Send the user information to client.
  res.status(StatusCodes.OK).json(userInfo);
};


const profileOfUser = async (req: Request, res: Response) => {
  const { body: userInput } = req;
  
  const user = userInput as User;

  const { email, password, newPassword } = user;
  
  //---> Check if user exists already.
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (!existingUser) {
    throw catchError(StatusCodes.BAD_REQUEST, "Invalid credentials");
  }

  //----> Check for the correctness of the user password.
  const isValid = await bcrypt.compare(password, existingUser.password);

  if (!isValid) {
    throw catchError(StatusCodes.BAD_REQUEST, "Invalid credentials");
  }

  //----> Hash the new password.
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;

  delete user.newPassword;

  //----> Store the new password in the database.

  const updatedUser = await prisma.user.update({
    where: { email },
    data: { ...user, id: existingUser.id},
  });

  //----> Make a user object information.
  const userInfo: UserInfo = {
    id: updatedUser.id,
    fullName: updatedUser.fullName,
    userType: updatedUser.userType,
    message: "Password is changed successfully, please login.",    
  };

  //----> Send the user information to client.
  res.status(StatusCodes.OK).json(userInfo);
};


const profileOfUserById = async (req: Request, res: Response) => {
  const { body: userInput } = req;
  const { id } = req.params;
  const user = userInput as User;

  const { email, password, newPassword, id: userId } = user;

  //----> Check for correctness of id.
  let isEqual = UuidTool.compare(id, userId);
  if (!isEqual) {
    throw catchError(StatusCodes.BAD_REQUEST, "Id mismatch");
  }

  //---> Check if user exists already.
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (!existingUser) {
    throw catchError(StatusCodes.BAD_REQUEST, "Invalid credentials");
  }

  //----> Check for the correctness of the user password.
  const isValid = await bcrypt.compare(password, existingUser.password);

  if (!isValid) {
    throw catchError(StatusCodes.BAD_REQUEST, "Invalid credentials");
  }

  //----> Hash the new password.
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;

  delete user.newPassword;

  //----> Store the new password in the database.

  const updatedUser = await prisma.user.update({
    where: { id },
    data: { ...user },
  });

  //----> Make a user object information.
  const userInfo: UserInfo = {
    id: updatedUser.id,
    fullName: updatedUser.fullName,
    userType: updatedUser.userType,
    message: "Password is changed successfully, please login.",    
  };

  //----> Send the user information to client.
  res.status(StatusCodes.OK).json(userInfo);
};


const signUpUser = async (req: Request, res: Response) => {
  const { body: newUser } = req;

  const userToSignUp = newUser as User;

  const email = userToSignUp.email;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user) {
    throw catchError(StatusCodes.BAD_REQUEST, "User already exists.");
  }

  const hashedPassword = await bcrypt.hash(userToSignUp.password, 10);

  userToSignUp.password = hashedPassword;

  const createdUser = await prisma.user.create({
    data: { ...userToSignUp },
  });

  //const token = await createJsonWebToken(createdUser.id, createdUser.fullName, createdUser.userType);

  const userInfo: UserInfo = {
    id: createdUser.id,
    fullName: createdUser.fullName,
    userType: createdUser.userType,
    message: "Signup is successful.",
  };

  res.status(StatusCodes.CREATED).json(userInfo);
};


async function createJsonWebToken(
  id: string,
  name: string,
  userType: UserType
) {
  const token = await jwt.sign(
    {
      id,
      name,
      userType,
    },
    process.env.JWT_TOKEN_SECRET!,
    { expiresIn: "1hr" }
  );

  return token;
}

export { changePasswordOfUser, loginUser, profileOfUser, profileOfUserById, signUpUser };
