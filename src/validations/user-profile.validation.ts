import Joi from "joi";
import { User } from "../models/user.model";

const userSchema = Joi.object().keys({
  fullName: Joi.string().required(),
  email: Joi.string().required().email(),
  phone: Joi.string().required(),
  password: Joi.string().required(),
  newPassword: Joi.string().required(),
  departmentId: Joi.string().required(),
});

export const userProfileValidation = (user: User) => {
  const { fullName, email, phone, departmentId, password, newPassword } = user;

  return userSchema.validate(
    {
      fullName,
      email,
      phone,
      departmentId,
      password,
      newPassword,
    },
    { abortEarly: false }
  );
};
