let cartDao;

if (process.env.PERSISTANCE === "MONGO") {
  const { mongoCartDao } = await import("../mongo/cart.dao.js");
  cartDao = mongoCartDao;
} else if (process.env.PERSISTANCE === "MEMORY") {
  const { memoryCartDao } = await import("../memory/cart.dao.js");
  cartDao = memoryCartDao;
}

export default cartDao;
