import { Router } from "express";

import * as productController from "../../controllers/web/product.controller.js";

export const productsViewsRouter = Router();

productsViewsRouter.get("/", productController.getProducts);
