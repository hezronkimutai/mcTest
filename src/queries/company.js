import db from "../database/models";
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const {
  company,
  socialMediaLink,
  imageUrl,
  widget,
  search,
  message: msgModel,
  user,
  article,
  like,
  articleRead,
  category,
} = db;

export default (req) => {
  const { id: userId } = req.user || {};
  const { companyId, companyName: companyName_Params } = req.params && req.params;
  const { existingRecord } = req;
  const { companyName, supportEmail, brandColor, websiteUrl, subDomain, customDomain, message, term, email } = req.body;
  const { EVEN_HELP_DOMAIN_NAME } = process.env;
  const createCompanyQuery = {
    companyName: (companyName && companyName.toLowerCase()) || "",
    supportEmail,
    brandColor: brandColor || "#047bd3",
    subDomain: `${companyName}.${EVEN_HELP_DOMAIN_NAME}`,
  };
  const checkCompanyConflictQuery = {
    where: { companyName: (companyName && companyName.toLowerCase()) || "" },
  };
  const checksupportEmailConflictQuery = {
    where: { supportEmail },
  };
  const updateCompanyQuery = [
    { ...createCompanyQuery, websiteUrl, subDomain, customDomain },
    { where: { id: companyId } },
  ];
  const checkCompanyExistanceQuery = { where: { id: companyId } };
  const checkTeamExistanceQuery = existingRecord && {
    where: {
      companyId: existingRecord.companyId,
      userId: existingRecord.userId,
    },
  };
  const sendMessageQuery = {
    message,
    companyId,
  };
  const postSearchQuery = {
    where: {
      [Op.or]: [
        {
          articleBody: {
            [Op.like]: "%" + req.body.term + "%",
          },
        },
        {
          articleTitle: {
            [Op.like]: "%" + req.body.term + "%",
          },
        },
      ],
    },
  };
  const getCompanyQuery = {
    where: { ...(userId ? { userId } : {}) },
    include: [
      {
        model: company,
        attributes: [
          "id",
          "companyName",
          "brandColor",
          "supportEmail",
          "subDomain",
          "customDomain",
          "websiteUrl",
          "styles",
        ],
        include: [
          { model: msgModel },
          { model: search },
          { model: imageUrl },
          { model: socialMediaLink },
          { model: widget },
          { model: article, include: [{ model: category }] },
          { model: articleRead },
          { model: category },
        ],
      },
      { model: user, attributes: ["id", "firstName", "lastName", "email"] },
    ],
    attributes: ["role", "id"],
  };
  const getCompanyArticlesQuery = {
    where: { companyName: (companyName_Params && companyName_Params.toLowerCase()) || "" },
    include: [
      { model: imageUrl },
      { model: socialMediaLink },
      { model: widget },
      { model: article, include: [{ model: like }, { model: category }] },
      { model: articleRead },
      { model: category },
    ],
  };
  return {
    createCompanyQuery,
    checkCompanyConflictQuery,
    checksupportEmailConflictQuery,
    updateCompanyQuery,
    checkCompanyExistanceQuery,
    checkTeamExistanceQuery,
    sendMessageQuery,
    postSearchQuery,
    getCompanyQuery,
    getCompanyArticlesQuery,
  };
};
