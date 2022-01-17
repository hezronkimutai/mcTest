import winston, { createLogger, format, transports } from "winston";
const { combine, timestamp, label, printf } = format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} ==>> ${level}  [${label}] : ${message}`;
});
const logger = createLogger({
  level: "info",
  format: combine(timestamp(), label({ label: "" }), myFormat),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "info.log", level: "info" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}
export const csLg = (level, message) =>
  logger.log({
    level,
    message,
  });
