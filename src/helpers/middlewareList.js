import { fiveHundredHandler } from "../middlewares/errorHandler";

export default (middlewareArr) => {
  return middlewareArr.map((middleware) => fiveHundredHandler(middleware));
};
