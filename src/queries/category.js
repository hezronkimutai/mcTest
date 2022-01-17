export default (req) => {
  const { companyId } = req.params;
  const { categoryName, categoryDescription } = req.body;
  const createCategoryQuery = { categoryName, categoryDescription, companyId };
  return {
    createCategoryQuery,
  };
};
