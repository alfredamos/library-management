import createError from "http-errors";
import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { Library } from "../models/library.model";
import { addWeeksToDate } from "../utils/add-weeks-to.date.util";

const prisma = new PrismaClient();

const numberOfWeeks = 2;

const createLibrary = async (req: Request, res: Response) => {
  const { body: newLibrary } = req;

  const newLibraryVar = newLibrary as Library;

  const bookId = newLibrary.bookId;

  const book = await prisma.book.findUnique({
    where: { id: bookId },
  });

  if (!book) {
    throw createError(
      StatusCodes.NOT_FOUND,
      `Book with id = ${bookId} is not found, please select the correct book.`
    );
  }

  const userId = newLibraryVar.userId;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw createError(
      StatusCodes.NOT_FOUND,
      `User with id = ${userId} is not found, please select the correct user.`
    );
  }

  const todaysDate = new Date();

  newLibraryVar.dateBookDue = addWeeksToDate(todaysDate, numberOfWeeks);

  const library = await prisma.library.create({
    data: { ...newLibraryVar },
  });

  res.status(StatusCodes.CREATED).json(library);
};

const deleteLibrary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const library = await prisma.library.findUnique({
    where: { id },
  });

  if (!library) {
    throw createError(
      StatusCodes.NOT_FOUND,
      `Library with id ${id} is not found.`
    );
  }

  const deletedLibrary = await prisma.library.delete({
    where: { id },
  });

  res.status(StatusCodes.OK).json(deletedLibrary);
};

const editLibrary = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { body: libraryToUpdate } = req;

  const libraryToUpdateVar = libraryToUpdate as Library;

  const library = await prisma.library.findUnique({
    where: { id },
  });

  if (!library) {
    throw createError(
      StatusCodes.NOT_FOUND,
      `Library with id ${id} is not found.`
    );
  }

  const bookId = libraryToUpdateVar.bookId;

  const book = await prisma.book.findUnique({
    where: { id: bookId },
  });

  if (!book) {
    throw createError(
      StatusCodes.NOT_FOUND,
      `book with id = ${bookId} is not found, please select the correct book.`
    );
  }

  const userId = libraryToUpdateVar.userId;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw createError(
      StatusCodes.NOT_FOUND,
      `user with id = ${userId} is not found, please select the correct user.`
    );
  }

  const updatedLibrary = await prisma.library.update({
    where: { id },
    data: { ...libraryToUpdateVar },
  });

  res.status(StatusCodes.OK).json(updatedLibrary);
};

const getAllLibraries = async (req: Request, res: Response) => {
  const libraries = await prisma.library.findMany({
    include: {
      book: true,
      user: true,
    },
  });

  res.status(StatusCodes.OK).json(libraries);
};

const getLibraryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const library = await prisma.library.findUnique({
    where: { id },
    include: {
      book: true,
      user: true,
    },
  });

  if (!library) {
    throw createError(
      StatusCodes.NOT_FOUND,
      `Library with id ${id} is not found.`
    );
  }

  res.status(StatusCodes.OK).json(library);
};

export {
  createLibrary,
  deleteLibrary,
  editLibrary,
  getAllLibraries,
  getLibraryById,
};
