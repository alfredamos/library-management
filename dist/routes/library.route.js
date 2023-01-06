"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const check_if_authenticated_1 = require("../middleware/check-if-authenticated");
const library_controller_1 = require("../controllers/library.controller");
const library_validation_middleware_1 = require("../middleware/library-validation.middleware");
const check_can_library_modify_middleware_1 = require("../middleware/check-can-library-modify.middleware");
const router = express_1.default.Router();
router.route('/')
    .get(check_if_authenticated_1.checkIfAuthenticated, library_controller_1.getAllLibraries)
    .post(library_validation_middleware_1.libraryValidationMiddleware, check_if_authenticated_1.checkIfAuthenticated, library_controller_1.createLibrary);
router.route('/:id')
    .delete(check_if_authenticated_1.checkIfAuthenticated, check_can_library_modify_middleware_1.checKCanLibraryModify, library_controller_1.deleteLibrary)
    .get(check_if_authenticated_1.checkIfAuthenticated, library_controller_1.getLibraryById)
    .patch(library_validation_middleware_1.libraryValidationMiddleware, check_if_authenticated_1.checkIfAuthenticated, check_can_library_modify_middleware_1.checKCanLibraryModify, library_controller_1.editLibrary);
exports.default = router;
