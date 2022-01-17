import responseHandler from "../../helpers/responseHandler";
import db from "../../database/models";
import userQueries from "../../queries/users";
import companyQueries from "../../queries/company";

const { user, company, team } = db;

export const checkConflict = async (table, query, res, next, message) => {
  const results = await table.findOne(query);
  return results ? responseHandler(res, message, 409) : next();
};
export const checkUserConflict = async (req, res, next) => {
  checkConflict(user, userQueries(req).checkEmailExistanceQuery, res, next, "The user already exists");
};
export const checkCompanyConflict = async (req, res, next) => {
  checkConflict(company, companyQueries(req).checkCompanyConflictQuery, res, next, "The company name already exists");
};
export const checksupportEmailConflict = async (req, res, next) => {
  checkConflict(
    company,
    companyQueries(req).checksupportEmailConflictQuery,
    res,
    next,
    `The email support already exists`
  );
};
export const checkTeamConflict = async (req, res, next) => {
  checkConflict(team, companyQueries(req).checkTeamExistanceQuery, res, next, `The user is already a team member`);
};
