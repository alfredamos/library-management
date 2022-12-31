import Joi from "joi";
import { Author } from "../models/author.model";

const authorSchema = Joi.object().keys({
    name: Joi.string().required(),    
})

export const authorValidation = (author: Author) => {
    const {name} = author;   
    
    return authorSchema.validate({name}, { abortEarly: false });
}