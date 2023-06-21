import { loggerDev, loggerProd } from "../utils/logger.js";

const logger = process.env.NODE_ENV === "DEV" ? loggerDev : loggerProd;

export const addLogger = (req, res, next) => {
  req.logger = logger;
  req.logger.http(
    `${req.method} ${req.url} - ${new Date().toLocaleTimeString()}`
  );
  next();
};
