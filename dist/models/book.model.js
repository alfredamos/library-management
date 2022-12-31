"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
class Book {
    constructor() {
        this.id = "";
        this.isbn = "";
        this.title = "";
        this.publisher = "";
        this.volume = "";
        this.edition = "";
        this.category = "";
        this.quantity = 1;
        this.dateOfPublication = new Date();
    }
}
exports.Book = Book;
