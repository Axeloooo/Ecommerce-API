let cartDao;

switch (process.env.PERSISTANCE) {
  case "MONGO":
    const { mongoCartDao } = await import("../mongo/cart.dao.js");
    cartDao = mongoCartDao;
  case "MEMORY":
    const { memoryCartDao } = await import("../memory/cart.dao.js");
    cartDao = memoryCartDao;
}

export default cartDao;
