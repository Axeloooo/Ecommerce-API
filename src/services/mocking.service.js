// Faker import
import { faker } from "@faker-js/faker";
import { ServerError } from "../errors/errors.js";

class MockingService {
  async getMockedData() {
    try {
      let products = [];

      for (let i = 0; i < 100; i++) {
        products.push({
          _id: faker.string.uuid(),
          title: faker.commerce.productName(),
          price: faker.commerce.price(),
          description: faker.commerce.productDescription(),
          code: faker.number.int(),
          status: faker.datatype.boolean(1),
          stock: faker.number.int(),
          category: faker.commerce.department(),
          thumbnails: [faker.image.url()],
        });
      }

      if (products.length === 0) {
        throw new ServerError("No products found");
      }

      return products;
    } catch (err) {
      console.error("Error in getMockedData:", err);
      throw err;
    }
  }
}

export const mockingService = new MockingService();
