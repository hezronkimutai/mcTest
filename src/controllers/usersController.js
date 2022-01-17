import responseHandler from "../helpers/responseHandler";
import db from "../database/models";
import queries from "../queries/users";
import imageQueries from "../queries/imageUrls";
import bcrypt from "bcrypt";
import { signToken } from "../helpers/jwtAuth";
import { userImageTypes } from "../constants";
import { resetPasswordService, forgotPasswordService } from "../services/transporter";

const { user, imageUrl, subscription } = db;

export const signInController = async (req, res) => {
  const { password, ...tokenData } = req.user.dataValues;
  const subscriptionData = await subscription.findOne({
    where: { userId: tokenData.id },
  });
  tokenData.subscription = subscriptionData.dataValues;
  responseHandler(res, "Signin successful", 200, signToken(tokenData));
};
export const signUpController = async (req, res) => {
  req.body.password = await bcrypt.hash(req.body.password, 10);
  const { createUserQuery } = queries(req);

  const result = await user.create(createUserQuery);

  await imageUrl.bulkCreate(userImageTypes.map((type) => ({ userId: result.id, type })));
  const { password, ...tokenData } = result.dataValues;

  const { id: subscriptionId, plan_id: planId, short_url: subscriptionLink, status } = req.subscription;

  const subscriptionData = await subscription.create({
    subscriptionId,
    planId,
    subscriptionLink,
    status,
    userId: result.dataValues.id,
  });
  tokenData.subscription = subscriptionData.dataValues;
  responseHandler(res, "Successfully created an account", 201, signToken(tokenData));
};
export const getUsersController = async (req, res) => {
  const { getUsersQuery } = queries(req);
  const results = await user.findAll(getUsersQuery);
  return results
    ? responseHandler(res, "Users fetched successfully", 200, results)
    : responseHandler(res, "Users record empty.", 404);
};
export const getUserController = async (req, res) => {
  const { getUserQuery } = queries(req);
  const results = await user.findOne(getUserQuery);
  return results
    ? responseHandler(res, "User fetched successfully", 200, results)
    : responseHandler(res, "User record not found.", 404);
};

export const updateUserController = async (req, res) => {
  const { password } = req.body;
  password ? (req.body.password = await bcrypt.hash(password, 10)) : "";
  const { updateUserQuery } = queries(req);
  const { updateProfileImageUrlQuery } = imageQueries(req);
  const results = await user.update(...updateUserQuery);
  updateProfileImageUrlQuery.map(async (query) => await imageUrl.update(...query));

  results[0]
    ? responseHandler(res, "Successfully updated user account", 201)
    : responseHandler(res, "User record not found.", 404);
};

export const forgotPasswordController = async (req, res) => {
  await forgotPasswordService(req);
  responseHandler(res, "We have sent you an email", 200);
};
export const resetPasswordController = async (req, res) => {
  req.body.password = await bcrypt.hash(req.body.password, 10);
  const { resePasswordQuery } = queries(req);
  const results = await user.update(...resePasswordQuery);
  await resetPasswordService(req);
  return results[0]
    ? responseHandler(res, "Successfully updated user account", 201)
    : responseHandler(res, "User record not found.", 404);
};
