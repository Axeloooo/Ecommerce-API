let userDao;

switch (process.env.PERSISTANCE) {
  case "MONGO":
    const { mongoUserDao } = await import("../mongo/user.dao.js");
    userDao = mongoUserDao;
  case "MEMORY":
    const { memoryUserDao } = await import("../memory/user.dao.js");
    userDao = memoryUserDao;
}

export default userDao;
