export class Cart {
  #products;

  constructor() {
    this.#products = [];
  }

  get products() {
    return this.#products;
  }

  set products(products) {
    this.#products = products;
  }
}
