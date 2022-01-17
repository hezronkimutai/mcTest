import responseHandler from "../helpers/responseHandler";
import db from "../database/models";
import createCategory from "../queries/category";

const { category } = db;

export const createCategoryController = async (req, res) => {
  const { createCategoryQuery } = createCategory(req);
  const result = await category.create(createCategoryQuery);
  responseHandler(res, "Successfully created a category", 201, result);
};
export const getCategoryController = async (req, res) => {
  const result = await category.findAll();
  responseHandler(res, "Successfully retrieved a categories", 201, result);
};
export const updateCategoryController = async (req, res) => {
  const { createCategoryQuery } = createCategory(req);
  const result = await category.update(createCategoryQuery, { where: { id: req.params.categoryId } });
  responseHandler(res, "Successfully edited the category", 201, result);
};
