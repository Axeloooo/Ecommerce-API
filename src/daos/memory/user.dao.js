import fs from "fs";

class UserDao {
  #user;

  constructor() {
    this.#user = [];
  }

  async getUserById(id) {
    try {
      const data = fs.readFileSync("./src/database/user.json", "utf8");
      this.#user = JSON.parse(data);
      const user = this.#user.find((item) => item._id == id);
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }

  async postUser(user) {
    try {
      const data = fs.readFileSync("./src/database/user.json", "utf8");
      this.#user = JSON.parse(data);
      const newUser = {
        _id: this.#user.length + 1,
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        age: user.age,
        password: user.password,
        role: user.role,
      };
      this.#user.push(newUser);
      fs.writeFileSync(
        "./src/database/user.json",
        JSON.stringify(this.#user),
        "utf8"
      );
      return newUser;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getUserByEmail(email) {
    try {
      const data = fs.readFileSync("./src/database/user.json", "utf8");
      this.#user = JSON.parse(data);
      const user = this.#user.find((item) => item.email == email);
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export const memoryUserDao = new UserDao();
