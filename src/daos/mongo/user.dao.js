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

  async postUser(user) {
    try {
      const res = await userModel.create({
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        age: user.age,
        password: user.password,
        role: user.role,
      });
      return res;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getUserByEmail(email) {
    try {
      const res = await userModel.findOne({
        email: email,
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
    role: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

const userModel = model(usersCollection, userSchema);

export const userDao = new UserDao(userModel);
