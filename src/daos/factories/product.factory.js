let productDao;

if (process.env.PERSISTANCE === "MONGO") {
  const { mongoProductDao } = await import("../mongo/product.dao.js");
  productDao = mongoProductDao;
} else if (process.env.PERSISTANCE === "MEMORY") {
  const { memoryProductDao } = await import("../memory/product.dao.js");
  productDao = memoryProductDao;
}

export default productDao;
