import { Router } from "express";
import * as cartController from "../../controllers/api/cart.controller.js";

export const cartsApiRouter = Router();

cartsApiRouter.get("/:cid", cartController.getCartById);

cartsApiRouter.post("/", cartController.postCart);

cartsApiRouter.post("/:cid/product/:pid", cartController.postProductInCartById);

cartsApiRouter.put("/:cid", cartController.putCartById);

cartsApiRouter.put("/:cid/products/:pid", cartController.putProductInCartById);

cartsApiRouter.delete("/:cid", cartController.deleteCartById);

cartsApiRouter.delete(
  "/:cid/products/:pid",
  cartController.deleteProductInCartById
);
