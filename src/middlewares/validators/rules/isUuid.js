import validator from "validator";
import responseHandler from "../../../helpers/responseHandler";

export default (req, res, next) => {
  let notUuid;
  Object.keys(req.params).map((param) => {
    if (
      param.toLowerCase().includes("id") &&
      !validator.isUUID(req.params[param])
    ) {
      notUuid = true;
    }
  });
  return notUuid ? responseHandler(res, `Id should be in uuid format`, 400) : next();
};
