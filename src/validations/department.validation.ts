import Joi from "joi";
import { Department } from "../models/department.model";

const departmentSchema = Joi.object().keys({
    name: Joi.string().required(),    
    faculty: Joi.string().required(),    
})

export const departmentValidation = (department: Department) => {
    const {name, faculty} = department;   
    
    return departmentSchema.validate({name, faculty}, { abortEarly: false });
}