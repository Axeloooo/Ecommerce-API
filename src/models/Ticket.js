export class Ticket {
  #code;
  #purchase_datetime;
  #amount;
  #purchaser;

  constructor({
    code: code,
    purchase_datetime: purchase_datetime,
    amount: amount,
    purchaser: purchaser,
  }) {
    this.#code = code;
    this.#purchase_datetime = purchase_datetime;
    this.#amount = amount;
    this.#purchaser = purchaser;
  }

  get code() {
    return this.#code;
  }

  set code(code) {
    this.#code = code;
  }

  get purchase_datetime() {
    return this.#purchase_datetime;
  }

  set purchase_datetime(purchase_datetime) {
    this.#purchase_datetime = purchase_datetime;
  }

  get amount() {
    return this.#amount;
  }

  set amount(amount) {
    this.#amount = amount;
  }

  get purchaser() {
    return this.#purchaser;
  }

  set purchaser(purchaser) {
    this.#purchaser = purchaser;
  }
}
