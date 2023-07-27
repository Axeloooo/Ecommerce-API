import userDao from "../daos/factories/user.factory.js";

class UserRepository {
  #userDao;

  constructor(userDao) {
    this.#userDao = userDao;
  }

  async getAllUsers() {
    return await userDao.getAllUsers();
  }

  async getUserById(id) {
    return userDao.getUserById(id);
  }

  async postUser(user) {
    return userDao.postUser(user);
  }

  async getUserByEmail(email) {
    return userDao.getUserByEmail(email);
  }
}

export const userRepository = new UserRepository(userDao);
