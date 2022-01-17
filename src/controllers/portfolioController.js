import responseHandler from "../helpers/responseHandler";
import db from "../database/models";
import portfolioQueries from "../queries/portfolio";

const { portfolio, portfolioDetail } = db;

export const createPortfolioController = async (req, res) => {
  const { createPortfolioQuery } = portfolioQueries(req);
  const { companyId, ...theRest } = createPortfolioQuery
  const result = await portfolio.create({ companyId });
  Object.keys(theRest).map(key => theRest[key].map(async detail => await portfolioDetail.create({ ...detail, portfolioId: result.dataValues.id })))
  responseHandler(res, "Successfully saved your portfolio", 201, result);
};

/**
 * Responsible for fetching company portfolio from the db
 * @param {req} request body
 * @param {res} response body
 */
export const getCompanyPortfoliosController = async (req, res) => {
  const { getCompanyPortfolioQuery } = portfolioQueries(req);
  let result = await portfolio.findOne(getCompanyPortfolioQuery);
  responseHandler(res, "Company Portfolios fetched successfully", 200, result);
};
