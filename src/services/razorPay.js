import Razorpay from "razorpay";

export const subscription = (req, res, next) => {
  const instance = new Razorpay({
    key_id: process.env.RAZOR_PAY_KEY_ID,
    key_secret: process.env.RAZOR_PAY_KEY_SECRET,
  });
  var options = {
    plan_id: "plan_EmdonWhgTjv7JE",
    total_count: 6,
    quantity: 1,
    customer_notify: 1,
    addons: [
      {
        item: {
          name: "Delivery charges",
          amount: 30000,
          currency: "INR",
        },
      },
    ],
    notes: {
      notes_key_1: "Tea, Earl Grey, Hot",
      notes_key_2: "Tea, Earl Grey… decaf.",
    },
  };
  instance.subscriptions.create(options, (err, subscription) => {

    req.subscription = subscription;
    next();
  });
};
