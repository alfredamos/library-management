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
exports.getLibraryById = exports.getAllLibraries = exports.editLibrary = exports.deleteLibrary = exports.createLibrary = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const add_weeks_to_date_util_1 = require("../utils/add-weeks-to.date.util");
const prisma = new client_1.PrismaClient();
const numberOfWeeks = 2;
const createLibrary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body: newLibrary } = req;
    const newLibraryVar = newLibrary;
    const bookId = newLibrary.bookId;
    const book = yield prisma.book.findUnique({
        where: { id: bookId },
    });
    if (!book) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, `Book with id = ${bookId} is not found, please select the correct book.`);
    }
    const userId = newLibraryVar.userId;
    const user = yield prisma.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, `User with id = ${userId} is not found, please select the correct user.`);
    }
    const todaysDate = new Date();
    newLibraryVar.dateBookDue = (0, add_weeks_to_date_util_1.addWeeksToDate)(todaysDate, numberOfWeeks);
    const library = yield prisma.library.create({
        data: Object.assign({}, newLibraryVar),
    });
    res.status(http_status_codes_1.StatusCodes.CREATED).json(library);
});
exports.createLibrary = createLibrary;
const deleteLibrary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const library = yield prisma.library.findUnique({
        where: { id },
    });
    if (!library) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, `Library with id ${id} is not found.`);
    }
    const deletedLibrary = yield prisma.library.delete({
        where: { id },
    });
    res.status(http_status_codes_1.StatusCodes.OK).json(deletedLibrary);
});
exports.deleteLibrary = deleteLibrary;
const editLibrary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body: libraryToUpdate } = req;
    const libraryToUpdateVar = libraryToUpdate;
    const library = yield prisma.library.findUnique({
        where: { id },
    });
    if (!library) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, `Library with id ${id} is not found.`);
    }
    const bookId = libraryToUpdateVar.bookId;
    const book = yield prisma.book.findUnique({
        where: { id: bookId },
    });
    if (!book) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, `book with id = ${bookId} is not found, please select the correct book.`);
    }
    const userId = libraryToUpdateVar.userId;
    const user = yield prisma.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, `user with id = ${userId} is not found, please select the correct user.`);
    }
    const updatedLibrary = yield prisma.library.update({
        where: { id },
        data: Object.assign({}, libraryToUpdateVar),
    });
    res.status(http_status_codes_1.StatusCodes.OK).json(updatedLibrary);
});
exports.editLibrary = editLibrary;
const getAllLibraries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const libraries = yield prisma.library.findMany({
        include: {
            book: true,
            user: true,
        },
    });
    res.status(http_status_codes_1.StatusCodes.OK).json(libraries);
});
exports.getAllLibraries = getAllLibraries;
const getLibraryById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const library = yield prisma.library.findUnique({
        where: { id },
        include: {
            book: true,
            user: true,
        },
    });
    if (!library) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, `Library with id ${id} is not found.`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json(library);
});
exports.getLibraryById = getLibraryById;
