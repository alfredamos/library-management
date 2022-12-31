import Joi from "joi";
import { Book } from "../models/book.model";

const bookSchema = Joi.object().keys({
    isbn: Joi.string().required(),
    title: Joi.string().required(),
    publisher: Joi.string().required(),
    edition: Joi.string().required(),
    volume: Joi.string().required(),
    category: Joi.string().required(),
    quantity: Joi.number().required(),
    dateOfPublication: Joi.string().required(),
})

export const bookValidation = (book: Book) => {
    const {
        isbn, 
        title, 
        publisher, 
        edition,
        volume,
        category,
        quantity,
        dateOfPublication,
    } = book;   
    
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
}