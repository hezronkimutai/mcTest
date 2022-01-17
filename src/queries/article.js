export default (req) => {
  const { companyId, articleId } = req.params;
  const { articleStatus, articleBody, articleTitle, categoryId } = req.body;
  const createArticleQuery = {
    articleStatus,
    articleBody,
    articleTitle,
    companyId,
    categoryId,
    userId: req.user && req.user.id,
  };
  const checkArticleExistanceQuery = { where: { id: articleId } };
  return {
    createArticleQuery,
    checkArticleExistanceQuery,
  };
};
