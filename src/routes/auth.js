import { Router } from "express";
import {
  signInController,
  signUpController,
  forgotPasswordController,
  resetPasswordController,
} from "../controllers/usersController";
import catchInputError from "../middlewares/validators/catchInputError";
import {
  userAccountRules,
  forgotPasswordRules,
  resetPasswordRules,
} from "../middlewares/validators/rules/userInputRules";
import { checkUserConflict } from "../middlewares/validators/checkConflict";
import { checkEmailExistance } from "../middlewares/validators/checkExistance";
import { verifyToken } from "../helpers/jwtAuth";
import passport from "passport";
import middlewareList from "../helpers/middlewareList";
import { subscription } from "../services/razorPay";

const router = Router();
router.post(
  "/signin",
  passport.authenticate("local"),
  ...middlewareList([signInController])
);
router.post(
  "/signup",
  userAccountRules(),
  ...middlewareList([
    subscription,
    catchInputError,
    checkUserConflict,
    signUpController,
  ])
);
router.post(
  "/forgot-password",
  forgotPasswordRules(),
  ...middlewareList([
    catchInputError,
    checkEmailExistance,
    forgotPasswordController,
  ])
);
router.post(
  "/reset-password/:token",
  resetPasswordRules(),
  ...middlewareList([catchInputError, verifyToken, resetPasswordController])
);
export default router;
