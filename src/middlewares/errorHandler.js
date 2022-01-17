import fs from "fs";
import { csLg } from "../logger";
export const fiveHundredHandler = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      csLg("error", `${JSON.stringify(new Date())} : ${error.message}`);
      const readData = (err, data) => {
        const writeStream = fs.createWriteStream("error.log");
        writeStream.write(`${error.message}\n${JSON.stringify(new Date())} >>>>>> ${data}`);
        writeStream.end();
      };
      fs.readFile("error.log", "utf8", readData);
      next({ status: 500, message: error.message });
    }
  };
};
