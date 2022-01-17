import fs from "fs";
import config from "../database/config.json";
import ncp from "ncp";

export const buildNonJs = () => {
  ncp("src/database/config.json", "dist/database/config.json", (err) =>
    err ? console.error(err) : 0
  );

  ncp("src/services/emailTemplates", "dist/services/emailTemplates", (err) =>
    err ? console.error(err) : 0
  );
};
require("make-runnable");
