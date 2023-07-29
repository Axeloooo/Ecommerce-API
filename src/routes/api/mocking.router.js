import { Router } from "express";

import * as mockingController from "../../controllers/api/mocking.controller.js";

export const mockingApiRouter = Router();

mockingApiRouter.get("/", mockingController.getMockingProducts);
