"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const library_controller_1 = require("../controllers/library.controller");
const library_validation_middleware_1 = require("../middleware/library-validation.middleware");
const router = express_1.default.Router();
router.route('/')
    .get(library_controller_1.getAllLibraries)
    .post(library_validation_middleware_1.libraryValidationMiddleware, library_controller_1.createLibrary);
router.route('/:id')
    .delete(library_controller_1.deleteLibrary)
    .get(library_controller_1.getLibraryById)
    .patch(library_validation_middleware_1.libraryValidationMiddleware, library_controller_1.editLibrary);
exports.default = router;
