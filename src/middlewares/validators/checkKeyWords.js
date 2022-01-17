import responseHandler from "../../helpers/responseHandler";

export default async (req, res, next) => {
  const { companyName } = req.body;
  const keyWords = ["api", "www", "help", "app"];
  return keyWords.includes((companyName && companyName.toLowerCase() ) || "")
    ? responseHandler(
      res,
      "api, help, www, and app keywords cannot be used as company name ",
      409
    )
    : next();
};
