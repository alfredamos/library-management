"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const bookSchema = joi_1.default.object().keys({
    isbn: joi_1.default.string().required(),
    title: joi_1.default.string().required(),
    publisher: joi_1.default.string().required(),
    edition: joi_1.default.string().required(),
    volume: joi_1.default.string().required(),
    category: joi_1.default.string().required(),
    quantity: joi_1.default.number().required(),
    dateOfPublication: joi_1.default.string().required(),
});
const bookValidation = (book) => {
    const { isbn, title, publisher, edition, volume, category, quantity, dateOfPublication, } = book;
    return bookSchema.validate({
        isbn,
        title,
        publisher,
        edition,
        volume,
        category,
        quantity,
        dateOfPublication,
    }, { abortEarly: false });
};
exports.bookValidation = bookValidation;
