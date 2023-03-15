export class Product {
  #title;
  #description;
  #code;
  #price;
  #status;
  #stock;
  #category;
  #thumbnails;

  constructor(title, description, code, price, stock, category, thumbnails) {
    this.#title = title;
    this.#description = description;
    this.#code = code;
    this.#price = price;
    this.#status = true;
    this.#stock = stock;
    this.#category = category;
    this.#thumbnails = thumbnails;
  }

  get title() {
    return this.#title;
  }

  set title(title) {
    this.#title = title;
  }

  get description() {
    return this.#description;
  }

  set description(description) {
    this.#description = description;
  }

  get code() {
    return this.#code;
  }

  set code(code) {
    this.#code = code;
  }

  get price() {
    return this.#price;
  }

  set price(price) {
    this.#price = price;
  }

  get status() {
    return this.#status;
  }

  set status(status) {
    this.#status = status;
  }

  get stock() {
    return this.#stock;
  }

  set stock(stock) {
    this.#stock = stock;
  }

  get category() {
    return this.#category;
  }

  set category(category) {
    this.#category = category;
  }

  get thumbnails() {
    return this.#thumbnails;
  }

  set thumbnails(thumbnails) {
    this.#thumbnails = thumbnails;
  }
}
