import { productRepository } from "../../repositories/product.repository.js";

/**
 *  @desc   Get products
 *  route   GET api/products
 *  @access Private
 */
export async function getProducts(req, res) {
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
      res.status(404).json({ body: "Not Found" });
    }
    res.status(200).json({ body: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ body: "Server Error" });
  }
}

/**
 *  @desc   Get product by id
 *  route   GET api/products/:pid
 *  @access Private
 */
export async function getProductById(req, res) {
  try {
    const pid = req.params.pid;
    const product = await productRepository.getProductById(pid);
    if (!product) {
      res.status(404).json({ body: "Not Found" });
    }
    res.status(200).json({ body: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ body: "Server Error" });
  }
}

/**
 *  @desc   Post new product
 *  route   POST api/products
 *  @access Private
 */
export async function postProduct(req, res) {
  try {
    const product = req.body;
    const newProduct = await productRepository.postProduct(product);
    if (!newProduct) {
      res.status(400).json({ body: "Client Error" });
    }
    res.status(201).json({ body: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ body: "Server Error" });
  }
}

/**
 *  @desc   Put product
 *  route   PUT api/products/:pid
 *  @access Private
 */
export async function putProduct(req, res) {
  try {
    const pid = req.params.pid;
    const product = req.body;
    const updatedProduct = await productRepository.putProduct(pid, product);
    if (!updatedProduct) {
      res.status(400).json({ body: "Client Error" });
    }
    res.status(200).json({ body: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ body: "Server Error" });
  }
}

/**
 *  @desc   Delete product by id
 *  route   DELETE api/products/:pid
 *  @access Private
 */
export async function deleteProductById(req, res) {
  try {
    const pid = req.params.pid;
    const deletedProduct = await productRepository.deleteProductById(pid);
    if (!deletedProduct) {
      res.status(400).json({ body: "Client Error" });
    }
    res.status(200).json({ body: deletedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ body: "Server Error" });
  }
}
