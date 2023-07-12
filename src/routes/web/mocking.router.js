import { Router } from "express";

import * as mockingController from "../../controllers/web/mocking.controller.js";

export const mockingViewRouter = Router();

mockingViewRouter.get("/", mockingController.getMockingProducts);
