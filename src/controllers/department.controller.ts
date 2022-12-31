import createError from "http-errors";
import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { Department } from "../models/department.model";

const prisma = new PrismaClient();

const createDepartment = async (req: Request, res: Response) => {
  const { body: newDepartment } = req;

  const newDepartmentVar = newDepartment as Department;

  const department = await prisma.department.create({
    data: { ...newDepartmentVar },
  });

  res.status(StatusCodes.CREATED).json(department);
};

const deleteDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const department = await prisma.department.findUnique({
    where: { id },
  });

  if (!department) {
    throw createError(
      StatusCodes.NOT_FOUND,
      `Department with id ${id} is not found.`
    );
  }

  const deletedDepartment = await prisma.department.delete({
    where: { id },
  });

  res.status(StatusCodes.OK).json(deletedDepartment);
};

const editDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { body: departmentToUpdate } = req;

  const departmentToUpdateVar = departmentToUpdate as Department;

  const department = await prisma.department.findUnique({
    where: { id },
  });

  if (!department) {
    throw createError(
      StatusCodes.NOT_FOUND,
      `Department with id ${id} is not found.`
    );
  }

  const updatedDepartment = await prisma.department.update({
    where: { id },
    data: { ...departmentToUpdateVar },
  });

  res.status(StatusCodes.OK).json(updatedDepartment);
};

const getAllDepartments = async (req: Request, res: Response) => {
  const departments = await prisma.department.findMany({
    include: {
      users: true,
    },
  });

  res.status(StatusCodes.OK).json(departments);
};

const getDepartmentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const department = await prisma.department.findUnique({
    where: { id },
    include: {
      users: true,
    },
  });

  if (!department) {
    throw createError(
      StatusCodes.NOT_FOUND,
      `Department with id ${id} is not found.`
    );
  }

  res.status(StatusCodes.OK).json(department);
};

export {
  createDepartment,
  deleteDepartment,
  editDepartment,
  getAllDepartments,
  getDepartmentById,
};
