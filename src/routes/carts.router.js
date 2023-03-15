import { Router } from "express";
import {
  getCartById,
  postProductInCart,
  postNewCart,
} from "../controllers/cart.controller.js";

export const cartsRouter = Router();

cartsRouter.post("/", async (req, res) => {
  try {
    const cart = await postNewCart();
    if (!cart) {
      res.status(400).send(`Couldn't create new cart`);
    }
    res.status(201).send(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating new cart");
  }
});

cartsRouter.get("/:cid", async (req, res) => {
  try {
    const cid = parseInt(req.params.cid);
    const cart = await getCartById(cid);
    if (!cart) {
      res.status(404).send(`Cart with ID ${cid} not found`);
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send("An unexpected error occurred");
  }
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    const product = await postProductInCart(cid, pid);
    if (!product) {
      res
        .status(404)
        .send(`Cart with ID ${cid} and product with ID ${pid} not found`);
    }
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding product in cart");
  }
});
