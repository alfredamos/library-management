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
exports.checKCanLibraryModify = void 0;
const http_status_codes_1 = require("http-status-codes");
const http_errors_1 = __importDefault(require("http-errors"));
const client_1 = require("@prisma/client");
const uuid_tool_1 = require("uuid-tool");
const prisma = new client_1.PrismaClient();
const checKCanLibraryModify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userInfo = req['user'];
    if (!id) {
        next((0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "This book order does not exist."));
    }
    const library = yield prisma.library.findUnique({
        where: { id },
    });
    if (!library) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "This book order does not exist.");
    }
    const userId = library === null || library === void 0 ? void 0 : library.userId;
    const isValid = uuid_tool_1.UuidTool.compare(userInfo.id, userId);
    if (isValid || userInfo.userType === client_1.UserType.Admin) {
        next();
        return;
    }
    else {
        next((0, http_errors_1.default)(http_status_codes_1.StatusCodes.UNAUTHORIZED, "You are not authorized to perform this task."));
        return;
    }
});
exports.checKCanLibraryModify = checKCanLibraryModify;
