import { Router } from "express";
import {
  createArticleController,
  likeArticleController,
  getArticlesController,
  editArticleController,
} from "../controllers/articleController";
import { checkArticleExistance, checkCompanyExistance } from "../middlewares/validators/checkExistance";
import { verifyToken } from "../helpers/jwtAuth";
import { createArticleRules, likeArticleRules } from "../middlewares/validators/rules/articleInputRules";
import catchInputError from "../middlewares/validators/catchInputError";
import isUUId from "../middlewares/validators/rules/isUuid";
import middlewareList from "../helpers/middlewareList";
const router = Router();

router.post(
  "/create/:companyId",
  createArticleRules(),
  ...middlewareList([catchInputError, verifyToken, isUUId, checkCompanyExistance, createArticleController])
);
router.get("/:companyId", ...middlewareList([isUUId, checkCompanyExistance, getArticlesController]));
router.get(
  "/:companyId/:articleId",
  ...middlewareList([isUUId, checkCompanyExistance, checkArticleExistance, getArticlesController])
);
router.put(
  "/like/:articleId",
  likeArticleRules(),
  ...middlewareList([catchInputError, isUUId, checkArticleExistance, likeArticleController])
);
router.put(
  "/:articleId",
  createArticleRules(),
  ...middlewareList([catchInputError, isUUId, checkArticleExistance, editArticleController])
);
export default router;
