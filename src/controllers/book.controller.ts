import createError from "http-errors";
import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { Book } from "../models/book.model";

const prisma = new PrismaClient();

const createBook = async (req: Request, res: Response) => {
  const { body: newBook } = req;

  const newBookVar = newBook as Book;

  const dateOfPublication = newBookVar.dateOfPublication;

  if (typeof dateOfPublication === "string") {
    newBookVar.dateOfPublication = new Date(dateOfPublication);
  }

  const authorId = newBookVar.authorId;

  const author = await prisma.author.findUnique({
    where: { id: authorId },
  });

  if (!author) {
    throw createError(
      StatusCodes.NOT_FOUND,
      `author with id = ${authorId} is not found, please select the correct author.`
    );
    
  }

  const isbn = newBookVar.isbn;
  const bookIsbn = await prisma.book.findUnique({
    where: { isbn },
  });

  if (bookIsbn) {
    throw createError(StatusCodes.BAD_REQUEST, "isbn must be unique, please provide a unique isbn.");
    
  }

  const book = await prisma.book.create({
    data: { ...newBookVar },
  });

  res.status(StatusCodes.CREATED).json(book);
};

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const book = await prisma.book.findUnique({
    where: { id },
  });

  if (!book) {
    throw createError(
      StatusCodes.NOT_FOUND,
      `Book with id ${id} is not found.`
    ); 
    
  }

  const deletedBook = await prisma.book.delete({
    where: { id },
  });

  res.status(StatusCodes.OK).json(deletedBook);
};

const editBook = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { body: bookToUpdate } = req;

  const bookToUpdateVar = bookToUpdate as Book;

  const dateOfPublication = bookToUpdateVar.dateOfPublication;

  if (typeof dateOfPublication === "string") {
    bookToUpdateVar.dateOfPublication = new Date(dateOfPublication);
  }

  const book = await prisma.book.findUnique({
    where: { id },
  });

  if (!book) {
    throw createError(
      StatusCodes.NOT_FOUND,
      `Book with id ${id} is not found.`
    ); 
    
  }

  const authorId = bookToUpdateVar.authorId;

  const author = await prisma.author.findUnique({
    where: { id: authorId },
  });

  if (!author) {
    throw createError(
      StatusCodes.NOT_FOUND,
      `author with id = ${authorId} is not found, please select the correct author.`
    ); 
    
  }

  const isbn = bookToUpdateVar.isbn;
  const bookIsbn = await prisma.book.findUnique({
    where: { isbn },
  });

  if (bookIsbn) {
    throw createError(StatusCodes.BAD_REQUEST, "isbn must be unique");
  }

  const updatedBook = await prisma.book.update({
    where: { id },
    data: { ...bookToUpdateVar },
  });

  res.status(StatusCodes.OK).json(updatedBook);
};

const getAllBooks = async (req: Request, res: Response) => {
  const books = await prisma.book.findMany({
    include: {
      author: true,
      libraryBooks: true,
    },
  });

  res.status(StatusCodes.OK).json(books);
};

const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const book = await prisma.book.findUnique({
    where: { id },
    include: {
      author: true,
      libraryBooks: true,
    },
  });

  if (!book) {
    throw createError(
      StatusCodes.NOT_FOUND,
      `Book with id ${id} is not found.`
    );
    
  }

  res.status(StatusCodes.OK).json(book);
};

export { createBook, deleteBook, editBook, getAllBooks, getBookById };
