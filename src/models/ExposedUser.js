export class ExposedUser {
  #firstName;
  #lastName;
  #email;
  #role;

  constructor(firstName, lastName, email, role) {
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#email = email;
    this.#role = role;
  }

  get firstName() {
    return this.#firstName;
  }

  set firstName(firstName) {
    this.#firstName = firstName;
  }

  get lastName() {
    return this.#lastName;
  }

  set lastName(lastName) {
    this.#lastName = lastName;
  }

  get email() {
    return this.#email;
  }

  set email(email) {
    this.#email = email;
  }

  get role() {
    return this.#role;
  }

  set role(role) {
    this.#role = role;
  }
}
