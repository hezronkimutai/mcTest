import { Router } from "express";
import auth from "./auth";
import users from "./users";
import company from "./company";
import article from "./article";
import category from "./category";
import payments from "./payments";
import portfolios from "./portfolios";

const router = Router();

router.use("/auth", auth);
router.use("/users", users);
router.use("/companies", company);
router.use("/articles", article);
router.use("/categories", category);
router.use("/payments", payments);
router.use("/portfolios", portfolios);

export default router;
