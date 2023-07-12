import { Router } from "express";

import * as loggerController from "../../controllers/web/logger.controller.js";

export const loggerViewRouter = Router();

loggerViewRouter.get("/", loggerController.getLoggerTest);
