import { Router } from "express";
import {signUpUser, loginUser} from "../controllers/auth.controller";
import { userValidationMiddleware } from "../middleware/user-validation.middleware";
import { userLoginValidationMiddleware } from "../middleware/user-login-validation.middleware";

const router = Router();

router.route('/signup')
      .post(userValidationMiddleware, signUpUser)

router.route('/login')
      .post(userLoginValidationMiddleware, loginUser);
