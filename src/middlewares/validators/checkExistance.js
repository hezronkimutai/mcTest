import responseHandler from "../../helpers/responseHandler";
import db from "../../database/models";
import userScripts from "../../queries/users";
import companyQueries from "../../queries/company";
import articleQueries from "../../queries/article";
const { user, company, article } = db;

export const checkExistance = async (req, table, query, res, next) => {
  const results = await table.findOne(query);
  !req.existingRecord && (req.existingRecord = {});
  req.existingRecord = results && {
    ...req.existingRecord,
    ...results.dataValues,
  };
  return !results
    ? responseHandler(res, `The record doesn't exists`, 404)
    : (
        results && table === user
          ? (req.existingRecord.userId = results && results.id)
          : (req.existingRecord.companyId = results && results.id)
      )
    ? next()
    : "";
};

export const checkEmailExistance = async (req, res, next) => {
  checkExistance(req, user, userScripts(req).checkEmailExistanceQuery, res, next);
};
export const checkUserIdExistance = async (req, res, next) => {
  checkExistance(req, user, userScripts(req).checkUserIdExistanceQuery, res, next);
};
export const checkCompanyExistance = async (req, res, next) => {
  checkExistance(req, company, companyQueries(req).checkCompanyExistanceQuery, res, next);
};
export const checkArticleExistance = async (req, res, next) => {
  checkExistance(req, article, articleQueries(req).checkArticleExistanceQuery, res, next);
};
