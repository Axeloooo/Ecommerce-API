import fs from "fs/promises";
import { Product } from "../models/Product.js";

async function read() {
  try {
    const res = await fs.readFile("./src/database/products.json", "utf-8");
    return await JSON.parse(res);
  } catch (error) {
    throw error;
  }
}

async function write(data) {
  try {
    await fs.writeFile(
      "./src/database/products.json",
      JSON.stringify(data, null, 2)
    );
  } catch (error) {
    throw error;
  }
}

export async function getProducts(limit) {
  const products = await read();
  if (!products) {
    throw new Error("Unable to retrieve products");
  }
  if (!limit) {
    return products;
  }
  const lim = Number(limit);
  const limitedProducts =
    lim < products.length
      ? products.slice(0, lim)
      : products.slice(0, products.length);
  return limitedProducts;
}

export async function getProductById(pid) {
  const products = await read();
  if (!products) {
    throw new Error("Unable to retrieve products");
  }
  const product = products.find((product) => product.id === pid);
  if (!product) {
    throw new Error(`Unable to find product with id: ${pid}`);
  }
  return product;
}

export async function postProduct(data) {
  const products = await read();
  if (!products) {
    throw new Error("Unable to retrieve products");
  }
  const newProduct = new Product(
    data.title,
    data.description,
    data.code,
    data.price,
    data.stock,
    data.category,
    data.thumbnails
  );
  const product = {
    id: products.length + 1,
    title: newProduct.title,
    description: newProduct.description,
    code: newProduct.code,
    price: newProduct.price,
    status: newProduct.status,
    stock: newProduct.stock,
    category: newProduct.category,
    thumbnails: newProduct.thumbnails,
  };
  if (
    !product.id ||
    !product.title ||
    !product.description ||
    !product.code ||
    !product.price ||
    !product.status ||
    !product.stock ||
    !product.category ||
    !product.thumbnails
  ) {
    throw new Error("Unable to create new product");
  }
  products.push(product);
  await write(products);
  return product;
}

export async function putProduct(pid, data) {
  const products = await read();
  if (!products) {
    throw new Error("Unable to retrieve products");
  }
  const product = products.find((product) => product.id === pid);
  if (!product) {
    throw new Error(`Unable to find product with id: ${pid}`);
  }
  const updatedProduct = {
    id: product.id,
    title: data.title || product.title,
    description: data.description || product.description,
    code: data.code || product.code,
    price: data.price || product.price,
    status: data.status || product.status,
    stock: data.stock || product.stock,
    category: data.category || product.category,
    thumbnails: data.thumbnails || product.thumbnails,
  };
  const newProducts = products.map((product) =>
    product.id === pid ? updatedProduct : product
  );
  await write(newProducts);
  return updatedProduct;
}

export async function deleteProductById(pid) {
  const products = await read();
  if (!products) {
    throw new Error("Unable to retrieve products");
  }
  const deletedProduct = products.find((product) => product.id === pid);
  if (!deletedProduct) {
    throw new Error(`Unable to delete product with id: ${pid}`);
  }
  const newProducts = products.filter((product) => product.id !== pid);
  await write(newProducts);
  return deletedProduct;
}
