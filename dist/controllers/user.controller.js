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
exports.getUserById = exports.getAllUsers = exports.editUser = exports.deleteUser = exports.createUser = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const prisma = new client_1.PrismaClient();
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body: newUser } = req;
    const newUserVar = newUser;
    const departmentId = newUserVar.departmentId;
    const department = yield prisma.department.findUnique({
        where: { id: departmentId },
    });
    if (!department) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, `Department with id = ${departmentId} is not found, please select the correct department.`);
    }
    const user = yield prisma.user.create({
        data: Object.assign({}, newUserVar),
    });
    res.status(http_status_codes_1.StatusCodes.CREATED).json(user);
});
exports.createUser = createUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield prisma.user.findUnique({
        where: { id },
    });
    if (!user) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, `User with id ${id} is not found.`);
    }
    const deletedUser = yield prisma.user.delete({
        where: { id },
    });
    res.status(http_status_codes_1.StatusCodes.OK).json(deletedUser);
});
exports.deleteUser = deleteUser;
const editUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body: userToUpdate } = req;
    const userToUpdateVar = userToUpdate;
    const user = yield prisma.user.findUnique({
        where: { id },
    });
    if (!user) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, `User with id ${id} is not found.`);
    }
    const departmentId = userToUpdateVar.departmentId;
    const department = yield prisma.department.findUnique({
        where: { id: departmentId },
    });
    if (!department) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, `Department with id = ${departmentId} is not found, please select the correct department.`);
    }
    const updatedUser = yield prisma.user.update({
        where: { id },
        data: Object.assign({}, userToUpdateVar),
    });
    res.status(http_status_codes_1.StatusCodes.OK).json(updatedUser);
});
exports.editUser = editUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.user.findMany({
        include: {
            libraryUsers: true,
            department: true,
        },
    });
    res.status(http_status_codes_1.StatusCodes.OK).json(users);
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield prisma.user.findUnique({
        where: { id },
        include: {
            libraryUsers: true,
            department: true,
        },
    });
    if (!user) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, `User with id ${id} is not found.`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json(user);
});
exports.getUserById = getUserById;
