import jwt from "jsonwebtoken";
import responseHandler from "../helpers/responseHandler";

export const signToken = (data) => {
  const token = jwt.sign(data, process.env.JWT_KEY, {
    expiresIn: "24h",
  });
  return token;
};

export const verifyToken = (req, res, next) => {
  if (!req.params.token && !req.headers.authorization) {
    return responseHandler(res, "Please, insert the token", 401);
  }
  const token = req.params.token || req.headers.authorization.split(" ")[1].replace(",", "");
  jwt.verify(token, process.env.JWT_KEY, async (err, result) => {
    if (err) {
      return responseHandler(res, err, 401);
    }
    req.user = result;
    result.token = token;
    next();
  });
};
