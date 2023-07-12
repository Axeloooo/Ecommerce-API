// Faker import
import { faker } from "@faker-js/faker";

export async function getMockingProducts(req, res, next) {
  try {
    let products = [];

    for (let i = 0; i < 100; i++) {
      products.push({
        _id: faker.string.uuid(),
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        description: faker.commerce.productDescription(),
        code: faker.number.int(),
        status: faker.datatype.boolean(),
        stock: faker.number.int(),
        category: faker.commerce.department(),
        thumbnails: [faker.image.url()],
      });
    }

    res.json(products);
  } catch (err) {
    next(err);
  }
}
