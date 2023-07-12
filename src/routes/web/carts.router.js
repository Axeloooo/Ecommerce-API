import { Router } from "express";

import * as CartController from "../../controllers/web/cart.controller.js";

export const cartsViewsRouter = Router();

cartsViewsRouter.get("/:cid", CartController.getCartById);
