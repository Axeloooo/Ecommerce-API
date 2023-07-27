import { Schema, model } from "mongoose";

import {
  UserNotFoundError,
  UsersNotFoundError,
  ValidationError,
} from "../../errors/errors.js";

class UserDao {
  #userModel;

  constructor(userModel) {
    this.#userModel = userModel;
  }

  async getAllUsers() {
    try {
      const res = await this.#userModel.find({});
      if (!res) {
        throw new UsersNotFoundError("Users not found");
      }
      return res;
    } catch (err) {
      console.error("Error in getAllUsers:", err);
      throw err;
    }
  }

  async getUserById(id) {
    try {
      const res = await this.#userModel.findById(id);
      if (!res) {
        throw new UserNotFoundError(`User with ID ${id} not found.`);
      }
      return res;
    } catch (err) {
      console.error("Error in getUserById:", err);
      throw err;
    }
  }

  async postUser(user) {
    try {
      const res = await this.#userModel.create({
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        age: user.age,
        password: user.password,
        role: user.role,
      });
      return res;
    } catch (err) {
      if (err.name === "ValidationError") {
        throw new ValidationError("Invalid user data.");
      }
      console.error("Error in postUser:", err);
      throw err;
    }
  }

  async getUserByEmail(email) {
    try {
      const res = await this.#userModel.findOne({
        email: email,
      });
      if (!res) {
        throw new UserNotFoundError(`User with email ${email} not found.`);
      }
      return res;
    } catch (err) {
      console.error("Error in getUserByEmail:", err);
      throw err;
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

export const userModel = model(usersCollection, userSchema);

export const mongoUserDao = new UserDao(userModel);
