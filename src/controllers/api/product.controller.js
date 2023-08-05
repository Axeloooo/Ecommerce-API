import { productRepository } from "../../repositories/product.repository.js";

import {
  ServerError,
  NotFoundError,
  ClientError,
} from "../../errors/errors.js";

/**
 *  @desc   Get products
 *  route   GET api/products
 *  @access Private
 */
export async function getProducts(req, res, next) {
  try {
    const limit = req.query.lim;
    const page = req.query.page;
    const sort = req.query.sort;
    const query = req.query.query;
    const products = await productRepository.getProducts(
      limit,
      page,
      sort,
      query
    );
    if (!products) {
      return next(new NotFoundError("Not Found"));
    }
    res.status(200).json(products);
  } catch (error) {
    return next(error);
  }
}

/**
 *  @desc   Get product by id
 *  route   GET api/products/:pid
 *  @access Private
 */
export async function getProductById(req, res, next) {
  try {
    const pid = req.params.pid;
    const product = await productRepository.getProductById(pid);
    if (!product) {
      return next(new NotFoundError("Not Found"));
    }
    res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
}

/**
 *  @desc   Post new product
 *  route   POST api/products
 *  @access Private
 */
export async function postProduct(req, res, next) {
  try {
    const product = req.body;
    const newProduct = await productRepository.postProduct(product);
    if (!newProduct) {
      return next(new NotFoundError("Not Found"));
    }
    res.status(201).json({ body: newProduct });
  } catch (error) {
    return next(error);
  }
}

/**
 *  @desc   Put product
 *  route   PUT api/products/:pid
 *  @access Private
 */
export async function putProduct(req, res, next) {
  try {
    const pid = req.params.pid;
    const product = req.body;
    const updatedProduct = await productRepository.putProduct(pid, product);
    if (!updatedProduct) {
      return next(new ClientError("Client Error"));
    }
    res.status(200).json({ body: updatedProduct });
  } catch (error) {
    return next(error);
  }
}

/**
 *  @desc   Delete product by id
 *  route   DELETE api/products/:pid
 *  @access Private
 */
export async function deleteProductById(req, res, next) {
  try {
    const pid = req.params.pid;
    const deletedProduct = await productRepository.deleteProductById(pid);
    if (!deletedProduct) {
      return next(new ClientError("Client Error"));
    }
    res.status(200).json({ body: deletedProduct });
  } catch (error) {
    return next(error);
  }
}
