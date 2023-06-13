let userDao;

if (process.env.PERSISTANCE === "MONGO") {
  const { mongoUserDao } = await import("../mongo/user.dao.js");
  userDao = mongoUserDao;
} else if (process.env.PERSISTANCE === "MEMORY") {
  const { memoryUserDao } = await import("../memory/user.dao.js");
  userDao = memoryUserDao;
}

export default userDao;
