import cartDao from "../daos/factories/cart.factory.js";

class CartRepository {
  #cartDao;

  constructor(cartDao) {
    this.#cartDao = cartDao;
  }

  async getCarts() {
    try {
      return cartDao.getCarts();
    } catch (err) {
      throw new Error(err);
    }
  }

  async getCartById(cid) {
    try {
      return cartDao.getCartById(cid);
    } catch (err) {
      throw new Error(err);
    }
  }

  async postCart() {
    try {
      return cartDao.postCart();
    } catch (err) {
      throw new Error(err);
    }
  }

  async postProductInCartById(cid, pid) {
    try {
      return cartDao.postProductInCartById(cid, pid);
    } catch (err) {
      throw new Error(err);
    }
  }

  async putCartById(cid, data) {
    try {
      return cartDao.putCartById(cid, data);
    } catch (err) {
      throw new Error(err);
    }
  }

  async putProductInCartById(cid, pid, data) {
    try {
      return cartDao.putProductInCartById(cid, pid, data);
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteCartById(cid) {
    try {
      return cartDao.deleteCartById(cid);
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteProductInCartById(cid, pid) {
    try {
      return cartDao.deleteProductInCartById(cid, pid);
    } catch (err) {
      throw new Error(err);
    }
  }
}

export const cartRepository = new CartRepository(cartDao);
