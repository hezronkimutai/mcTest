import { Router } from "express";
import {
  createCategoryController,
  getCategoryController,
  updateCategoryController,
} from "../controllers/categoryController";
import { verifyToken } from "../helpers/jwtAuth";
import { createCategoryRules } from "../middlewares/validators/rules/categoryInputRules";
import catchInputError from "../middlewares/validators/catchInputError";
import middlewareList from "../helpers/middlewareList";
import isUUID from "../middlewares/validators/rules/isUuid";

const router = Router();

router.post(
  "/create/:companyId",
  createCategoryRules(),
  ...middlewareList([catchInputError, isUUID, verifyToken, createCategoryController])
);
router.put(
  "/edit/:categoryId",
  createCategoryRules(),
  ...middlewareList([catchInputError, isUUID, verifyToken, updateCategoryController])
);
router.get("/:companyId", ...middlewareList([verifyToken, getCategoryController]));
export default router;
