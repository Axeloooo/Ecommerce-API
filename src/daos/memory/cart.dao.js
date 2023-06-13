import fs from "fs";

class CartDao {
  #cart;

  constructor() {
    this.#cart = [];
  }

  async getCarts() {
    try {
      const data = fs.readFileSync("./src/database/cart.json", "utf8");
      this.#cart = JSON.parse(data);
      return this.#cart;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getCartById(cid) {
    try {
      const data = fs.readFileSync("./src/database/cart.json", "utf8");
      this.#cart = JSON.parse(data);
      const cart = this.#cart.find((item) => item._id == cid);
      return cart;
    } catch (err) {
      throw new Error(err);
    }
  }

  async postCart() {
    try {
      const data = fs.readFileSync("./src/database/cart.json", "utf8");
      this.#cart = JSON.parse(data);
      const cart = {
        _id: this.#cart.length + 1,
        products: [],
      };
      this.#cart.push(cart);
      fs.writeFileSync(
        "./src/database/cart.json",
        JSON.stringify(this.#cart),
        "utf8"
      );
      return cart;
    } catch (err) {
      throw new Error(err);
    }
  }

  async postProductInCartById(cid, pid) {
    try {
      const data = fs.readFileSync("./src/database/cart.json", "utf8");
      this.#cart = JSON.parse(data);
      const cart = this.#cart.find((item) => item._id == cid);
      for (let item of cart.products) {
        if (item.product._id == pid) {
          item.quantity += 1;
          return cart;
        }
      }
      cart.products.push({
        product: pid,
        quantity: 1,
      });
      fs.writeFileSync(
        "./src/database/cart.json",
        JSON.stringify(this.#cart),
        "utf8"
      );
      return cart;
    } catch (err) {
      throw new Error(err);
    }
  }

  async putCartById(cid, updatedCart) {
    try {
      const data = fs.readFileSync("./src/database/cart.json", "utf8");
      this.#cart = JSON.parse(data);
      const cart = this.#cart.find((item) => item._id == cid);
      cart.products = updatedCart.products;
      fs.writeFileSync(
        "./src/database/cart.json",
        JSON.stringify(this.#cart),
        "utf8"
      );
      return cart;
    } catch (err) {
      throw new Error(err);
    }
  }

  async putProductInCartById(cid, pid, updatedProduct) {
    try {
      const data = fs.readFileSync("./src/database/cart.json", "utf8");
      this.#cart = JSON.parse(data);
      const cart = this.#cart.find((item) => item._id == cid);
      for (let item of cart.products) {
        if (item.product._id == pid) {
          item.quantity = updatedProduct.quantity;
          return cart;
        }
      }
      fs.writeFileSync(
        "./src/database/cart.json",
        JSON.stringify(this.#cart),
        "utf8"
      );
      return cart;
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteCartById(cid) {
    try {
      const data = fs.readFileSync("./src/database/cart.json", "utf8");
      this.#cart = JSON.parse(data);
      this.#cart = this.#cart.filter((item) => item._id != cid);
      fs.writeFileSync(
        "./src/database/cart.json",
        JSON.stringify(this.#cart),
        "utf8"
      );
      return this.#cart;
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteProductInCartById(cid, pid) {
    try {
      const data = fs.readFileSync("./src/database/cart.json", "utf8");
      this.#cart = JSON.parse(data);
      const cart = this.#cart.find((item) => item._id == cid);
      cart.products = cart.products.filter((item) => item.product._id != pid);
      fs.writeFileSync(
        "./src/database/cart.json",
        JSON.stringify(this.#cart),
        "utf8"
      );
      return cart;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export const memoryCartDao = new CartDao();
