import Joi from "joi";
import { User } from "../models/user.model";

const userSchema = Joi.object().keys({    
    email: Joi.string().required().email(),    
    password: Joi.string().required(),       
})

export const userLoginValidation = (user: User) => {
    const {    
        email,         
        password
    } = user;   
    
    return userSchema.validate({
        email,         
        password
    }, { abortEarly: false });
}