import winston from "winston";

const customOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
};

export const loggerDev = winston.createLogger({
  levels: customOptions.levels,
  transports: [
    new winston.transports.Console({
      level: "debug",
    }),
  ],
});

export const loggerProd = winston.createLogger({
  levels: customOptions.levels,
  transports: [
    new winston.transports.File({
      filename: "errors.log",
      level: "info",
    }),
  ],
});
