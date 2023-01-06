import { Router } from "express";
import {
  changePasswordOfUser,
  loginUser,
  profileOfUser,
  signUpUser,
} from "../controllers/auth.controller";
import { userValidationMiddleware } from "../middleware/user-validation.middleware";
import { userProfileValidationMiddleware } from "../middleware/user-profile-validation.middleware";
import { userLoginValidationMiddleware } from "../middleware/user-login-validation.middleware";
import { userChangePasswordValidationMiddleware } from "../middleware/user-change-password-validation.middleware";

const router = Router();

router
  .route("/change-password")
  .patch(userChangePasswordValidationMiddleware, changePasswordOfUser);

router.route('/login')
      .post(userLoginValidationMiddleware, loginUser);

router.route("/profile/:id").patch(userProfileValidationMiddleware, profileOfUser);

router.route("/signup").post(userValidationMiddleware, signUpUser);


export default router;
