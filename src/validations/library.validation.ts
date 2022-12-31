import Joi from "joi";
import { Library } from "../models/library.model";

const librarySchema = Joi.object().keys({
    userId: Joi.string().required(),    
    bookId: Joi.string().required(),              
})

export const libraryValidation = (library: Library) => {
    const {
            userId, 
            bookId,          
        } = library;   
    
    return librarySchema.validate({
        userId, 
        bookId,      
    },{ abortEarly: false },);
}