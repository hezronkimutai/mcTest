import { Router } from "express";
import {
  createCompanyController,
  updateCompanyController,
  inviteUserController,
  acceptInviteController,
  sendMessageController,
  postSearchController,
  getCompanyController,
  paymentController,
  getCompanyArticles,
} from "../controllers/companyController";
import { verifyToken } from "../helpers/jwtAuth";
import {
  createCompanyRules,
  editCompanyRules,
  inviteUserRules,
  sendMessageRules,
  postSearchRules,
} from "../middlewares/validators/rules/companyInputRules";
import catchInputError from "../middlewares/validators/catchInputError";
import {
  checkCompanyConflict,
  checksupportEmailConflict,
  checkTeamConflict,
} from "../middlewares/validators/checkConflict";
import multer from "multer";
import imageUploader from "../middlewares/imageUploader";
import isUUID from "../middlewares/validators/rules/isUuid";
import { companyImages } from "../constants";
import {
  checkEmailExistance,
  checkCompanyExistance,
  checkUserIdExistance,
} from "../middlewares/validators/checkExistance";
import middlewareList from "../helpers/middlewareList";
import checkKeyWords from "../middlewares/validators/checkKeyWords";
const router = Router();
const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

const multipleUpload = multer({ storage: storage }).fields(
  companyImages.map((field) => ({ name: field, maxCount: 1 }))
);
router.post(
  "/create",
  createCompanyRules(),
  ...middlewareList([
    catchInputError,
    checkKeyWords,
    verifyToken,
    checkCompanyConflict,
    checksupportEmailConflict,
    createCompanyController,
  ])
);
router.put(
  "/edit/:companyId",
  multipleUpload,
  editCompanyRules(),
  ...middlewareList([verifyToken, catchInputError, checkKeyWords, isUUID, imageUploader, updateCompanyController])
);
router.post(
  "/invite/:companyId",
  inviteUserRules(),
  ...middlewareList([
    catchInputError,
    isUUID,
    verifyToken,
    checkEmailExistance,
    checkCompanyExistance,
    checkTeamConflict,
    inviteUserController,
  ])
);

router.get("/accept/:token", ...middlewareList([isUUID, verifyToken, acceptInviteController]));
router.post(
  "/messages/:companyId",
  sendMessageRules(),
  ...middlewareList([catchInputError, isUUID, checkCompanyExistance, sendMessageController])
);
router.post(
  "/search/:companyId",
  postSearchRules(),
  ...middlewareList([catchInputError, isUUID, checkCompanyExistance, postSearchController])
);
router.get("/", ...middlewareList([isUUID, verifyToken, getCompanyController]));
router.get("/all", ...middlewareList([isUUID, getCompanyController]));

router.get(
  "/team",
  ...middlewareList([
    // isUUID,
    verifyToken,
    getCompanyController,
  ])
);
router.get("/:companyName", ...middlewareList([getCompanyArticles]));
export default router;
