import { Router } from "express";
import * as usersController from "../../controllers/api/users.controller.js";

export const usersApiRouter = Router();

usersApiRouter.get("/", usersController.getAllUsers);
