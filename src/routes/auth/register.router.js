import { Router } from "express";

import * as registerController from "../../controllers/auth/register.controller.js";

export const registerAuthRouter = Router();

registerAuthRouter.get("/", registerController.getRegister);
