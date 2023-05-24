import { Router } from "express";

import * as sessionController from "../../controllers/api/session.controller.js";

import { rol } from "../../middlewares/rol.middleware.js";

export const sessionsApiRouter = Router();

sessionsApiRouter.post("/register", rol, sessionController.postRegister);

sessionsApiRouter.post("/login", sessionController.postLogin);

sessionsApiRouter.get("/logout", sessionController.postLogout);
