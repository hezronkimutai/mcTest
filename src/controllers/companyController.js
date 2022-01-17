import responseHandler from "../helpers/responseHandler";
import db from "../database/models";
import queries from "../queries/company";
import socialMediaLinksQuery from "../queries/socialMediaLinks";
import { socialMediaAccounts, companyImages } from "../constants";
import imageQueries from "../queries/imageUrls";
import widgetQueries from "../queries/widget";
import { inviteUserService } from "../services/transporter";
import getCountPerDay, { daylist } from "../helpers/getCountPerDay";

const { company, socialMediaLink, imageUrl, widget, team, message, search, like, article } = db;

/**
 * Responsible for saving new company data to the db
 * @param {req} request body
 * @param {res} response body
 */
export const createCompanyController = async (req, res) => {
  const { createCompanyQuery } = queries(req);
  const result = await company.create(createCompanyQuery);
  await widget.create({ companyId: result.id });
  await team.create({
    userId: req.user.id,
    companyId: result.id,
    role: "owner",
  });
  await socialMediaLink.bulkCreate(socialMediaAccounts.map((type) => ({ companyId: result.id, type })));
  await imageUrl.bulkCreate(companyImages.map((type) => ({ companyId: result.id, type })));
  responseHandler(res, "Successfully created an account", 201, result);
};

/**
 *Responsible for updating company info
 * @param {req} request body
 * @param {res} response body
 */
export const updateCompanyController = async (req, res) => {
  const { updateCompanyQuery } = queries(req);
  const { updateCompanyImagesQuery } = imageQueries(req);
  const { updateWidgetQuery } = widgetQueries(req);
  const { updateCompanySocialMediaLinksQuery } = socialMediaLinksQuery(req);
  const result = await company.update(...updateCompanyQuery);
  updateCompanySocialMediaLinksQuery.map(async (query) => {
    return await socialMediaLink.update(...query);
  });
  updateCompanyImagesQuery.map(async (query) => {
    return await imageUrl.update(...query);
  });
  await widget.update(...updateWidgetQuery);
  return !result[0]
    ? responseHandler(res, "company not found", 404)
    : responseHandler(res, "Successfully updated company details", 201);
};
/**
 * Controller that is responsible for saving new company data to the db
 * @param {req} request body
 * @param {res} response body
 */
export const inviteUserController = async (req, res) => {
  await inviteUserService(req);
  responseHandler(res, "We have sent an email", 200);
};
/**
 * Controller that is responsible for saving new company data to the db
 * @param {req} request body
 * @param {res} response body
 */
export const acceptInviteController = async (req, res) => {
  const teamExist = await team.findOne({
    where: { userId: req.user.userId, companyId: req.user.companyId },
  });
  !teamExist &&
    (await team.create({
      userId: req.user.userId,
      companyId: req.user.companyId,
      role: "member",
    }));

  res.redirect(`${process.env.FRONT_END_BASE_URL}companies/${req.user.companyName}/edit`);
};
/**
 * Responsible for saving sent messages to the db
 * @param {req} request body
 * @param {res} response body
 */
export const sendMessageController = async (req, res) => {
  const { sendMessageQuery } = queries(req);
  const result = await message.create(sendMessageQuery);
  responseHandler(res, "You have submitted your mesage", 201, message);
};
/**
 * Responsible for saving knowledgebase searched key words to the db
 * @param {req} request body
 * @param {res} response body
 */
export const postSearchController = async (req, res) => {
  const { postSearchQuery } = queries(req);
  const result = await article.findAll(postSearchQuery);
  const searched = await search.findOne({ where: { term: req.body.term } });
  searched && (await search.update({ count: searched.count + 1 }, { where: { term: req.body.term } }));
  !searched &&
    (await search.create({
      success: result.length ? true : false,
      term: req.body.term,
      companyId: req.params.companyId,
      count: 1,
    }));

  responseHandler(res, "The search term have been stored successfully", 201, result);
};

/**
 * Responsible for fetching company info from the db
 * @param {req} request body
 * @param {res} response body
 */
export const getCompanyController = async (req, res) => {
  const { getCompanyQuery } = queries(req);
  let result = await team.findAll(getCompanyQuery);
  const likes = await like.findAll({});
  let resp = result.map((team) => {
    team.dataValues.daylist = daylist;
    team.dataValues.company.dataValues.messageCount = getCountPerDay(team.company.messages);
    team.dataValues.company.dataValues.searchCount = getCountPerDay(team.company.searches);
    team.dataValues.company.dataValues.articleReadCount = getCountPerDay(team.company.articleReads);
    team.dataValues.company.dataValues.articles = team.dataValues.company.dataValues.articles.map((article) => {
      const articleId = article.dataValues.id;
      article.dataValues.likes = likes.filter(
        (item) => item.dataValues.articleId === articleId && item.dataValues.like === true
      ).length;
      article.dataValues.unLikes = likes.filter(
        (item) => item.dataValues.articleId === articleId && item.dataValues.like === false
      ).length;

      return article;
    });
    return team;
  });

  resp
    ? responseHandler(res, "Fetched compan[y][ies] successfully", 200, resp)
    : responseHandler(res, "Company not found", 404, resp);
};
/**
 * Responsible for fetching company articles from the db
 * @param {req} request body
 * @param {res} response body
 */
export const getCompanyArticles = async (req, res) => {
  const { getCompanyArticlesQuery } = queries(req);
  let result = await company.findOne(getCompanyArticlesQuery);
  responseHandler(res, "Company Articles fetched successfully", 200, result);
};
