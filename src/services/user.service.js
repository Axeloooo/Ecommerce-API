import { userRepository } from "../repositories/user.repository.js";

import { ExposedUser } from "../models/ExposedUser.js";

class UserService {
  async getAllUsers() {
    try {
      const users = await userRepository.getAllUsers();
      if (users.length === 0) {
        return users;
      }
      const parsedUsers = users.map((user) => {
        const parsedUser = new ExposedUser(
          user.first_name,
          user.last_name,
          user.email,
          user.role
        );
        return {
          first_name: parsedUser.firstName,
          last_name: parsedUser.lastName,
          email: parsedUser.email,
          role: parsedUser.role,
        };
      });
      return parsedUsers;
    } catch (err) {
      console.error("Error in getAllUsers:", err);
      throw err;
    }
  }
}

export const userService = new UserService();
