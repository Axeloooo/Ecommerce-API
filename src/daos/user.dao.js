import { Schema, model } from "mongoose";

class UserDao {
  #userModel;

  constructor(userModel) {
    this.#userModel = userModel;
  }

  async getUserById(id) {
    try {
      const res = await userModel.findById(id);
      return res;
    } catch (err) {
      throw new Error(err);
    }
  }

  async postRegister(user) {
    try {
      const res = await userModel.create({
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        age: user.age,
        password: user.password,
        rol: user.rol,
      });
      return res;
    } catch (err) {
      throw new Error(err);
    }
  }

  async postLogin(user) {
    try {
      const res = await userModel.findOne({
        email: user.email,
      });
      return res;
    } catch (err) {
      throw new Error(err);
    }
  }
}

const usersCollection = "users";

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
    },
    password: {
      type: String,
    },
    rol: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

const userModel = model(usersCollection, userSchema);

export const userDao = new UserDao(userModel);
