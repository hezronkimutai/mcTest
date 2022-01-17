import { Router } from "express";
import {
  getUsersController,
  getUserController,
  updateUserController,
} from "../controllers/usersController";
import { fiveHundredHandler } from "../middlewares/errorHandler";
import { verifyToken } from "../helpers/jwtAuth";
import multer from "multer";
import imageUploader from "../middlewares/imageUploader";
import { editUserAccountRules } from "../middlewares/validators/rules/userInputRules";
import catchInputError from "../middlewares/validators/catchInputError";
import isUUID from "../middlewares/validators/rules/isUuid";
import middlewareList from "../helpers/middlewareList";

const router = Router();
const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});
const multipleUpload = multer({ storage: storage }).fields([
  { name: "profileImage", maxCount: 1 },
]);

router.get("/", ...middlewareList([verifyToken, getUsersController]));

router.get(
  "/:userId",
  ...middlewareList([verifyToken, isUUID, getUserController])
);
router.put(
  "/edit-profile",
  multipleUpload,
  editUserAccountRules(),
  ...middlewareList([
    verifyToken,
    catchInputError,
    imageUploader,
    updateUserController,
  ])
);
export default router;
