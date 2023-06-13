import userDao from "../daos/factories/user.factory.js";

class UserRepository {
  #userDao;

  constructor(userDao) {
    this.#userDao = userDao;
  }

  async getUserById(id) {
    try {
      return userDao.getUserById(id);
    } catch (err) {
      throw new Error(err);
    }
  }

  async postUser(user) {
    try {
      return userDao.postUser(user);
    } catch (err) {
      throw new Error(err);
    }
  }

  async getUserByEmail(email) {
    try {
      return userDao.getUserByEmail(email);
    } catch (err) {
      throw new Error(err);
    }
  }
}

export const userRepository = new UserRepository(userDao);
