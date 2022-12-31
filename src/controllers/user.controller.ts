import createError from "http-errors";
import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/user.model";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

const createUser = async (req: Request, res: Response) => {
  const { body: newUser } = req;

  const newUserVar = newUser as User;

  const departmentId = newUserVar.departmentId;

  const department = await prisma.department.findUnique({
    where: { id: departmentId },
  });

  if (!department) {
    throw createError(
      StatusCodes.NOT_FOUND,
      `Department with id = ${departmentId} is not found, please select the correct department.`
    );
  }

  

  const user = await prisma.user.create({
    data: { ...newUserVar },
  });

  res.status(StatusCodes.CREATED).json(user);
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw createError(
      StatusCodes.NOT_FOUND,
      `User with id ${id} is not found.`
    );
  }

  const deletedUser = await prisma.user.delete({
    where: { id },
  });

  res.status(StatusCodes.OK).json(deletedUser);
};

const editUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { body: userToUpdate } = req;

  const userToUpdateVar = userToUpdate as User;

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw createError(
      StatusCodes.NOT_FOUND,
      `User with id ${id} is not found.`
    );
  }

  const departmentId = userToUpdateVar.departmentId;

  const department = await prisma.department.findUnique({
    where: { id: departmentId },
  });

  if (!department) {
    throw createError(
      StatusCodes.NOT_FOUND,
      `Department with id = ${departmentId} is not found, please select the correct department.`
    );
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: { ...userToUpdateVar },
  });

  res.status(StatusCodes.OK).json(updatedUser);
};

const getAllUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    include: {
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
    include: {
      libraryUsers: true,
      department: true,
    },
  });

  if (!user) {
    throw createError(
      StatusCodes.NOT_FOUND,
      `User with id ${id} is not found.`
    );
  }

  res.status(StatusCodes.OK).json(user);
};

export { createUser, deleteUser, editUser, getAllUsers, getUserById };
