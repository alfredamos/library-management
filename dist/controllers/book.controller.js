"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookById = exports.getAllBooks = exports.editBook = exports.deleteBook = exports.createBook = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const prisma = new client_1.PrismaClient();
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body: newBook } = req;
    const newBookVar = newBook;
    const dateOfPublication = newBookVar.dateOfPublication;
    if (typeof dateOfPublication === "string") {
        newBookVar.dateOfPublication = new Date(dateOfPublication);
    }
    const authorId = newBookVar.authorId;
    const author = yield prisma.author.findUnique({
        where: { id: authorId },
    });
    if (!author) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, `author with id = ${authorId} is not found, please select the correct author.`);
    }
    const isbn = newBookVar.isbn;
    const bookIsbn = yield prisma.book.findUnique({
        where: { isbn },
    });
    if (bookIsbn) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "isbn must be unique, please provide a unique isbn.");
    }
    const book = yield prisma.book.create({
        data: Object.assign({}, newBookVar),
    });
    res.status(http_status_codes_1.StatusCodes.CREATED).json(book);
});
exports.createBook = createBook;
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const book = yield prisma.book.findUnique({
        where: { id },
    });
    if (!book) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, `Book with id ${id} is not found.`);
    }
    const deletedBook = yield prisma.book.delete({
        where: { id },
    });
    res.status(http_status_codes_1.StatusCodes.OK).json(deletedBook);
});
exports.deleteBook = deleteBook;
const editBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body: bookToUpdate } = req;
    const bookToUpdateVar = bookToUpdate;
    const dateOfPublication = bookToUpdateVar.dateOfPublication;
    if (typeof dateOfPublication === "string") {
        bookToUpdateVar.dateOfPublication = new Date(dateOfPublication);
    }
    const book = yield prisma.book.findUnique({
        where: { id },
    });
    if (!book) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, `Book with id ${id} is not found.`);
    }
    const authorId = bookToUpdateVar.authorId;
    const author = yield prisma.author.findUnique({
        where: { id: authorId },
    });
    if (!author) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, `author with id = ${authorId} is not found, please select the correct author.`);
    }
    const isbn = bookToUpdateVar.isbn;
    const bookIsbn = yield prisma.book.findUnique({
        where: { isbn },
    });
    if (bookIsbn) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "isbn must be unique");
    }
    const updatedBook = yield prisma.book.update({
        where: { id },
        data: Object.assign({}, bookToUpdateVar),
    });
    res.status(http_status_codes_1.StatusCodes.OK).json(updatedBook);
});
exports.editBook = editBook;
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield prisma.book.findMany({
        include: {
            author: true,
            libraryBooks: true,
        },
    });
    res.status(http_status_codes_1.StatusCodes.OK).json(books);
});
exports.getAllBooks = getAllBooks;
const getBookById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const book = yield prisma.book.findUnique({
        where: { id },
        include: {
            author: true,
            libraryBooks: true,
        },
    });
    if (!book) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, `Book with id ${id} is not found.`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json(book);
});
exports.getBookById = getBookById;
