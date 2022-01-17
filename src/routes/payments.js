import { Router } from "express";
import {
  subscriptionController,
  planController, paypalSubscriptionController
} from "../controllers/paymentControllers";
import { verifyToken } from "../helpers/jwtAuth";

import middlewareList from "../helpers/middlewareList";
import { subscription } from '../services/razorPay'
const router = Router()

router.post(
  "/plan",
  ...middlewareList([
    planController,
  ])
);
router.post(
  "/subscription",
  ...middlewareList([
    subscription,
    subscriptionController,
  ])
);
router.post(
  "/subscription/paypal",
  ...middlewareList([
    // subscription,
    verifyToken,
    paypalSubscriptionController,
  ])
);

export default router;
