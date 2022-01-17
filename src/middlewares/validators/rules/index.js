import { check } from "express-validator";
import { socialMediaAccounts } from "../../../constants/index";

// Company Rules
export const companyName = check(
  "companyName",
  "companyName should be valid"
).isString()
export const websiteUrl = check("websiteUrl", "websiteUrl should be valid")
  .isURL()
  .optional();
export const customDomain = check(
  "customDomain",
  "customDomain should be valid"
)
  .isURL()
  .optional();
export const subDomain = check("subDomain", "subDomain should be valid")
  .isURL()
  .optional();
export const brandColor = check(
  "brandColor",
  "brandColor should be valid"
).matches(/^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3}|[a-fA-F0-9]{4})$/, "i");
export const socialMedia = socialMediaAccounts.map((acc) =>
  check(`${acc}`, `Put a ${acc} link`).isURL().optional()
);
export const widgetPrimaryColor = check(
  "brandColor",
  "brandColor should be valid"
).matches(/^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3}|[a-fA-F0-9]{4})$/, "i");
export const widgetNavbarColor1 = check(
  "brandColor",
  "brandColor should be valid"
).matches(/^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3}|[a-fA-F0-9]{4})$/, "i");
export const widgetNavbarColor2 = check(
  "brandColor",
  "brandColor should be valid"
).matches(/^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3}|[a-fA-F0-9]{4})$/, "i");
export const widgetLauncherBackgroundColor = check(
  "brandColor",
  "brandColor should be valid"
).matches(/^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3}|[a-fA-F0-9]{4})$/, "i");
export const widgetLauncherIconColor = check(
  "brandColor",
  "brandColor should be valid"
).matches(/^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3}|[a-fA-F0-9]{4})$/, "i");
export const message = check("message", "message should be valid").isString();
export const term = check("term", "term should be valid").isString();
export const success = check("success", "success should be valid").isBoolean();

//User
export const email = check("email", "email should be valid").trim().isEmail();
export const supportEmail = check("supportEmail", "email should be valid")
  .trim()
  .isEmail();
export const firstName = check("firstName", "name should be valid").isString();
export const lastName = check("lastName", "name should be valid").isString();
export const password = check("password", "Enter a valid password").isLength({
  min: 8,
});
export const editUserPassword = check("password", "Enter a valid password").isLength({
  min: 8,
}).optional();

// Article
export const articleTitle = check(
  "articleTitle",
  "articleTitle should be valid"
).isString(); //Todo: Validate categoryId in the isUUID middleware
export const articleBody = check(
  "articleBody",
  "articleBody should be valid"
).isString();
export const articleStatus = check(
  "articleStatus",
  "articleStatus should be valid"
).isString();
export const like = check("like", "like should be valid").isBoolean();

// Category
export const categoryName = check(
  "categoryName",
  "categoryName should be valid"
).isString();
export const categoryDescription = check(
  "categoryDescription",
  "categoryDescription should be valid"
).isString();
