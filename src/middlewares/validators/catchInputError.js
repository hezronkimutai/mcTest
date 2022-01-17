import { validationResult } from "express-validator";
import responseHandler from "../../helpers/responseHandler";
export default (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.errors.map(err => err.msg);
    return responseHandler(res, errorMessage, 400);
  }
  return next();
};
