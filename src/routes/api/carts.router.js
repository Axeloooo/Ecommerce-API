import { Router } from "express";
import * as cartController from "../../controllers/api/cart.controller.js";

export const cartsApiRouter = Router();

cartsApiRouter.get("/", cartController.getCarts);

cartsApiRouter.get("/:cid", cartController.getCartById);

cartsApiRouter.post("/", cartController.postCart);

cartsApiRouter.post("/:cid/product/:pid", cartController.postProductInCartById);

cartsApiRouter.post("/:cid/purchase", cartController.postPurchase);

cartsApiRouter.put("/:cid", cartController.putCartById);

cartsApiRouter.put("/:cid/product/:pid", cartController.putProductInCartById);

cartsApiRouter.delete("/:cid", cartController.deleteCartById);

cartsApiRouter.delete(
  "/:cid/product/:pid",
  cartController.deleteProductInCartById
);
