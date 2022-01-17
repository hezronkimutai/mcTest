import responseHandler from "../helpers/responseHandler";
import db from "../database/models";
import articleQueries from "../queries/article";

const { article, like, articleRead } = db;

export const createArticleController = async (req, res) => {
  const { createArticleQuery } = articleQueries(req);
  const result = await article.create(createArticleQuery);
  responseHandler(res, "Successfully created the article", 201, result);
};
export const getArticlesController = async (req, res) => {
  const { companyId, articleId } = req.params;

  const result = await article.findAll({
    where: articleId ? { companyId, id: articleId } : { companyId },
  });

  const likes = await like.count({
    where: { ...(articleId ? { articleId } : {}), like: true },
  });

  const unlikes = await like.count({
    where: { ...(articleId ? { articleId } : {}), like: false },
  });

  articleId && (await articleRead.create({ companyId, articleId }));

  responseHandler(res, "Successfully retrieved the article", 200, {
    articles: result,
    likes,
    unlikes,
  });
};

export const likeArticleController = async (req, res) => {
  const { like: likeType } = req.query;
  const result = await like.create({ like: likeType, ...req.params });
  responseHandler(res, "Successfully liked the article", 200, result);
};
export const editArticleController = async (req, res) => {
  const { createArticleQuery } = articleQueries(req);
  await article.update(createArticleQuery, { where: { id: req.params.articleId } });
  responseHandler(res, "Successfully updated the article", 201);
};
