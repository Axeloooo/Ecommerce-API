import productDao from "../daos/factories/product.factory.js";

class ProductRepository {
  #productDao;

  constructor(productDao) {
    this.#productDao = productDao;
  }

  async getProducts(limit, page, sort, query) {
    try {
      return productDao.getProducts(limit, page, sort, query);
    } catch (err) {
      throw new Error(err);
    }
  }

  async getProductById(pid) {
    try {
      return productDao.getProductById(pid);
    } catch (err) {
      throw new Error(err);
    }
  }

  async postProduct(data) {
    try {
      return productDao.postProduct(data);
    } catch (err) {
      throw new Error(err);
    }
  }

  async putProduct(pid, data) {
    try {
      return productDao.putProduct(pid, data);
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteProductById(pid) {
    try {
      return productDao.deleteProductById(pid);
    } catch (err) {
      throw new Error(err);
    }
  }
}

export const productRepository = new ProductRepository(productDao);
