import { userDao } from "../daos/user.dao.js";

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

  async postRegister(user) {
    try {
      return userDao.postRegister(user);
    } catch (err) {
      throw new Error(err);
    }
  }

  async postLogin(user) {
    try {
      return userDao.postLogin(user);
    } catch (err) {
      throw new Error(err);
    }
  }
}

export const userRepository = new UserRepository(userDao);
