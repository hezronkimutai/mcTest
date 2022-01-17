import responseHandler from "../helpers/responseHandler";
import db from "../database/models";
const { plan, subscription } = db;

export const subscriptionController = async (req, res, next) => {
  const {
    id: subscriptionId,
    plan_id: planId,
    short_url: subscriptionLink,
    status,
  } = req.subscription;

  const result = await subscription.create({
    userId: req.user && req.user.id,
    subscriptionId,
    planId,
    subscriptionLink,
    status,
  });

  responseHandler(res, "successfully Created a subscription", 201, result);
};

export const paypalSubscriptionController = async (req, res, next) => {
  const {
    orderId,
    subscriptionId,
    planId,
    subscriptionLink,
    status,
  } = req.body;

  const result = await subscription.create({
    userId: req.user && req.user.id,
    subscriptionId,
    planId,
    subscriptionLink,
    status,
    orderId
  });
  responseHandler(res, "successfully Created a subscription", 201, result);
};

export const planController = async (req, res, next) => {
  const {
    planId,
    planName,
    planDescription,
    billingAmmount,
    billingFrequency,
    notes,
  } = req.body;
  const result = await plan.create({
    planId,
    planName,
    planDescription,
    billingAmmount,
    billingFrequency,
    notes,
  });
  responseHandler(res, "company not found", 201, result);
};
