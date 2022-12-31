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
exports.getDepartmentById = exports.getAllDepartments = exports.editDepartment = exports.deleteDepartment = exports.createDepartment = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const prisma = new client_1.PrismaClient();
const createDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body: newDepartment } = req;
    const newDepartmentVar = newDepartment;
    const department = yield prisma.department.create({
        data: Object.assign({}, newDepartmentVar),
    });
    res.status(http_status_codes_1.StatusCodes.CREATED).json(department);
});
exports.createDepartment = createDepartment;
const deleteDepartment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const department = yield prisma.department.findUnique({
        where: { id },
    });
    if (!department) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, `Department with id ${id} is not found.`);
    }
    const deletedDepartment = yield prisma.department.delete({
        where: { id },
    });
    res.status(http_status_codes_1.StatusCodes.OK).json(deletedDepartment);
});
exports.deleteDepartment = deleteDepartment;
const editDepartment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body: departmentToUpdate } = req;
    const departmentToUpdateVar = departmentToUpdate;
    const department = yield prisma.department.findUnique({
        where: { id },
    });
    if (!department) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, `Department with id ${id} is not found.`);
    }
    const updatedDepartment = yield prisma.department.update({
        where: { id },
        data: Object.assign({}, departmentToUpdateVar),
    });
    res.status(http_status_codes_1.StatusCodes.OK).json(updatedDepartment);
});
exports.editDepartment = editDepartment;
const getAllDepartments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const departments = yield prisma.department.findMany({
        include: {
            users: true,
        },
    });
    res.status(http_status_codes_1.StatusCodes.OK).json(departments);
});
exports.getAllDepartments = getAllDepartments;
const getDepartmentById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const department = yield prisma.department.findUnique({
        where: { id },
        include: {
            users: true,
        },
    });
    if (!department) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, `Department with id ${id} is not found.`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json(department);
});
exports.getDepartmentById = getDepartmentById;
