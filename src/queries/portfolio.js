import db from "../database/models";
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const {
  portfolio, portfolioDetail
} = db;

export default (req) => {
  const { companyId } = req.params;
  const { landing, projects, services, whyMe, blogs, experience, patners } = req.body;
  const createPortfolioQuery = {
    landing, projects, services, whyMe, blogs, experience, patners, companyId
  };
  const getCompanyPortfolioQuery = {
    where: { companyId },
    include: [
      { model: portfolioDetail },
      // { model: socialMediaLink },
      // { model: widget },
      // { model: article, include: [{ model: like }, { model: category }] },
      // { model: articleRead },
      // { model: category },
    ],
  };
  return {
    createPortfolioQuery,
    getCompanyPortfolioQuery
  };
};
