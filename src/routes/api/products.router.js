import { Router } from "express";

import * as productController from "../../controllers/api/product.controller.js";

export const productsApiRouter = Router();

productsApiRouter.get("/", productController.getProducts);

productsApiRouter.get("/:pid", productController.getProductById);

productsApiRouter.post("/", productController.postProduct);

productsApiRouter.put("/:pid", productController.putProduct);

productsApiRouter.delete("/:pid", productController.deleteProductById);
