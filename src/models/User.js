export class User {
  #firstName;
  #lastName;
  #email;
  #age;
  #password;
  #rol;

  constructor(firstName, lastName, email, age, password, rol) {
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#email = email;
    this.#age = age;
    this.#password = password;
    this.#rol = rol;
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

  get age() {
    return this.#age;
  }

  set age(age) {
    this.#age = age;
  }

  get password() {
    return this.#password;
  }

  set password(password) {
    this.#password = password;
  }

  get rol() {
    return this.#rol;
  }

  set rol(rol) {
    this.#rol = rol;
  }
}
