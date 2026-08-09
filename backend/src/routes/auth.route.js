import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  changePassword
} from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import {
  userRegistrationValidators,
  userLoginValidators,
  changePasswordValidators
} from "../validators/user.validator.js";

const router = Router();

router.post("/register", userRegistrationValidators(), validate, registerUser);

router.post("/login", userLoginValidators(), validate, loginUser);

router.post("/logout", verifyToken, logoutUser);

router.post("/change-password", verifyToken, changePasswordValidators(), validate, changePassword);

export default router;