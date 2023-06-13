let productDao;

switch (process.env.PERSISTANCE) {
  case "MONGO":
    const { mongoProductDao } = await import("../mongo/product.dao.js");
    productDao = mongoProductDao;
  case "MEMORY":
    const { memoryProductDao } = await import("../memory/product.dao.js");
    productDao = memoryProductDao;
}

export default productDao;
