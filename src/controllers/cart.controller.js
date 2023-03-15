import fs from "fs/promises";
import { Cart } from "../models/Cart.js";

async function read() {
  try {
    const res = await fs.readFile("./src/database/carts.json", "utf-8");
    return await JSON.parse(res);
  } catch (error) {
    throw error;
  }
}

async function write(data) {
  try {
    await fs.writeFile(
      "./src/database/carts.json",
      JSON.stringify(data, null, 2)
    );
  } catch (error) {
    throw error;
  }
}

export async function getCartById(cid) {
  const carts = await read();
  if (!carts) {
    throw new Error("Unable to retrieve carts");
  }
  const cart = carts.find((cart) => cart.id === cid);
  if (!cart) {
    throw new Error(`Unable to find cart with ID ${cid}`);
  }
  return cart;
}

export async function postNewCart() {
  const carts = await read();
  if (!carts) {
    throw new Error("Unable to retrieve carts");
  }
  const newCart = new Cart();
  const cart = { id: carts.length + 1, products: newCart.products };
  if (!cart.id || !cart.products) {
    throw new Error("Unable to create new cart");
  }
  carts.push(cart);
  return cart;
}

export async function postProductInCart(cid, pid) {
  const carts = await read();
  if (!carts) {
    throw new Error("Unable to retrieve carts");
  }
  const cart = carts.find((cart) => cart.id === cid);
  if (!cart) {
    throw new Error(`Unable to find cart with ID ${cid}`);
  }
  const product = cart.products.find((product) => product.id === pid);
  if (product === undefined) {
    const newProduct = { id: pid, quantity: 1 };
    cart.products.push(newProduct);
    await write(carts);
    return newProduct;
  } else if (product) {
    product.quantity += 1;
    await write(carts);
    return product;
  } else {
    throw new Error(
      `Unable to add new product with ID ${pid} in selected cart with ID ${cid}`
    );
  }
}
