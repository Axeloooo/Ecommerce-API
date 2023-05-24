import { Router } from "express";

import * as loginController from "../../controllers/auth/login.controller.js";

export const loginAuthRouter = Router();

loginAuthRouter.get("/", loginController.getLogin);
