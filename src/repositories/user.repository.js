import userDao from "../daos/factories/user.factory.js";

class UserRepository {
  #userDao;

  constructor(userDao) {
    this.#userDao = userDao;
  }

  async getAllUsers() {
    return await userDao.getAllUsers();
  }

  async getUserById(id, context = "controller") {
    return userDao.getUserById(id, context);
  }

  async postUser(user) {
    return userDao.postUser(user);
  }

  async getUserByEmail(email, context = "controller") {
    return userDao.getUserByEmail(email, context);
  }
}

export const userRepository = new UserRepository(userDao);
