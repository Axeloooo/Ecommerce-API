import fs from "fs";

class ProductDao {
  #product;

  constructor() {
    this.#product = [];
  }

  async getProducts(limit, page, sort, query) {
    try {
      const data = fs.readFileSync("./src/database/product.json", "utf8");
      this.#product = JSON.parse(data);
      const products = this.#product;
      return products;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getProductById(pid) {
    try {
      const data = fs.readFileSync("./src/database/product.json", "utf8");
      this.#product = JSON.parse(data);
      const product = this.#product.find((item) => item._id == pid);
      return product;
    } catch (err) {
      throw new Error(err);
    }
  }

  async postProduct(product) {
    try {
      const data = fs.readFileSync("./src/database/product.json", "utf8");
      this.#product = JSON.parse(data);
      const newProduct = {
        _id: this.#product.length + 1,
        title: product.title,
        code: product.code,
        description: product.description,
        price: product.price,
        status: product.status,
        stock: product.stock,
        category: product.category,
        thumbnails: product.thumbnails,
      };
      this.#product.push(newProduct);
      fs.writeFileSync(
        "./src/database/product.json",
        JSON.stringify(this.#product),
        "utf8"
      );
      return newProduct;
    } catch (err) {
      throw new Error(err);
    }
  }

  async putProduct(pid, updatedProduct) {
    try {
      const data = fs.readFileSync("./src/database/product.json", "utf8");
      this.#product = JSON.parse(data);
      const product = this.#product.find((item) => item._id == pid);
      const index = this.#product.indexOf(product);
      this.#product[index] = {
        _id: pid,
        title: updatedProduct.title,
        code: updatedProduct.code,
        description: updatedProduct.description,
        price: updatedProduct.price,
        status: updatedProduct.status,
        stock: updatedProduct.stock,
        category: updatedProduct.category,
        thumbnails: updatedProduct.thumbnails,
      };
      fs.writeFileSync(
        "./src/database/product.json",
        JSON.stringify(this.#product),
        "utf8"
      );
      return this.#product[index];
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteProductById(pid) {
    try {
      const data = fs.readFileSync("./src/database/product.json", "utf8");
      this.#product = JSON.parse(data);
      const product = this.#product.find((item) => item._id == pid);
      const newProduct = this.#product.filter((item) => item._id != pid);
      this.#product = newProduct;
      fs.writeFileSync(
        "./src/database/product.json",
        JSON.stringify(this.#product),
        "utf8"
      );
      return product;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export const memoryProductDao = new ProductDao();
