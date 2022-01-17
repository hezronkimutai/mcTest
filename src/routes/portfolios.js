import { Router } from "express";
import {
  createPortfolioController, getCompanyPortfoliosController
} from "../controllers/portfolioController";
// import { checkArticleExistance, checkCompanyExistance } from "../middlewares/validators/checkExistance";
// import { verifyToken } from "../helpers/jwtAuth";
import { createPortfolioRules } from "../middlewares/validators/rules/portfolioInputRules";
import catchInputError from "../middlewares/validators/catchInputError";
import isUUId from "../middlewares/validators/rules/isUuid";
import middlewareList from "../helpers/middlewareList";
const router = Router();

router.post(
  "/create/:companyId",
  createPortfolioRules(),
  ...middlewareList([catchInputError, isUUId,
    //  verifyToken, checkCompanyExistance, 
    createPortfolioController])
);
router.get(
  "/:companyId",
  // createPortfolioRules(),
  ...middlewareList([catchInputError, isUUId,
    //  verifyToken, checkCompanyExistance, 
    getCompanyPortfoliosController])
);
export default router;
