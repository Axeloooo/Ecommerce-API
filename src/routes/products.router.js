import { Router } from "express";
import {
  getProducts,
  getProductById,
  deleteProductById,
  postProduct,
  putProduct,
} from "../controllers/product.controller.js";

export const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
  try {
    const limit = req.query.lim;
    const products = await getProducts(limit);
    if (!products) {
      res.status(404).send(`Products not found`);
    }
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("An unexpected error ocurred");
  }
});

productsRouter.get("/:pid", async (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    const product = await getProductById(pid);
    if (!product) {
      res.status(404).send(`Product with ID ${pid} not found`);
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("An unexpected error ocurred");
  }
});

productsRouter.post("/", async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await postProduct(product);
    if (!newProduct) {
      res.status(400).send(`Couldn't create new cart`);
    }
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("An unexpected error ocurred");
  }
});

productsRouter.put("/:pid", async (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    const product = req.body;
    const updatedProduct = await putProduct(pid, product);
    if (!updatedProduct) {
      res.status(400).send(`Couldn't update product with ID ${pid}`);
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("An unexpected error ocurred");
  }
});

productsRouter.delete("/:pid", async (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    const deletedProduct = await deleteProductById(pid);
    if (!deletedProduct) {
      res.status(400).send(`Couldn't delete product with ID ${pid}`);
    }
    res.status(200).json(deletedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("An unexpected error ocurred");
  }
});
