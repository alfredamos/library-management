import catchError from "http-errors";
import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/user.model";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { UserType } from "@prisma/client";
import {UuidTool} from "uuid-tool"
import { UserInfo } from "../models/user-info.model";

const prisma = new PrismaClient();

const createUser = async (req: Request, res: Response) => {
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

  const token = await createJsonWebToken(
    createdUser.id,
    createdUser.fullName,
    createdUser.userType
  );

  const userInfo: UserInfo = {
    id: createdUser.id,
    fullName: createdUser.fullName,
    userType: createdUser.userType,
    token,
  };

  res.status(StatusCodes.CREATED).json(userInfo);
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw catchError(StatusCodes.NOT_FOUND, `User with id ${id} is not found.`);
  }

  const deletedUser = await prisma.user.delete({
    where: { id },
  });

  res.status(StatusCodes.OK).json(deletedUser);
};

const editUser = async (req: Request, res: Response, next: NextFunction) => {
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

  if (!newPassword) {
    throw catchError(StatusCodes.BAD_REQUEST, "Provide the new password.");
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

  //----> Generate Json web token.
  /* const token = await generateJwtWebToken(
    updatedUser.id,
    updatedUser.name,
    updatedUser.userType
  ); */

  //----> Make a user object information.
  const userInfo: UserInfo = {
    id: updatedUser.id,
    fullName: updatedUser.fullName,
    userType: updatedUser.userType,
    message: "Password is changed successfully, please login.",
    //token,
  };

  //----> Send the user information to client.
  res.status(StatusCodes.OK).json(userInfo);
};

const getAllUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      fullName: true,
      userType: true,
      libraryUsers: true,
      department: true,
    },
  });

  res.status(StatusCodes.OK).json(users);
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      fullName: true,
      userType: true,
      libraryUsers: true,
      department: true,
    },
  });

  if (!user) {
    throw catchError(StatusCodes.NOT_FOUND, `User with id ${id} is not found.`);
  }

  res.status(StatusCodes.OK).json(user);
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

export { createUser, deleteUser, editUser, getAllUsers, getUserById };
