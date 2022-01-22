import responseHandler from "../helpers/responseHandler";
import db from "../database/models";
import queries from "../queries/users";

const { user } = db;

export const getUsersController = async (req, res) => {
  const { getUsersQuery } = queries(req);
  const results = await user.findAll(getUsersQuery);
  return results
    ? responseHandler(res, "Users fetched successfully", 200, results)
    : responseHandler(res, "Users record empty.", 404);
};
export const getUserController = async (req, res) => {
  const { getUserQuery } = queries(req);
  const results = await user.findOne(getUserQuery);
  return results
    ? responseHandler(res, "User fetched successfully", 200, results)
    : responseHandler(res, "User record not found.", 404);
};
