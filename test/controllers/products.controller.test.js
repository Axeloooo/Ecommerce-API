import supertest from "supertest";
import { after } from "mocha";
import { assert } from "chai";

import mongoose from "mongoose";

import { app, server } from "../../src/app/app.js";
import { productModel } from "../../src/daos/mongo/product.dao.js";

const http = supertest(app);

const newProduct = {
  title: "GTA V",
  description: "Videogame",
  code: "abcde",
  price: 100,
  status: false,
  stock: 2,
  category: "games",
  thumbnails: [],
};

const incompleteProduct = {
  description: "Videogame",
  code: "abcde",
  price: 100,
  status: false,
  stock: 2,
  category: "games",
};

describe("Products Controller", () => {
  describe("POST /api/products", () => {
    it("should create a new product", async () => {
      const response = await http.post("/api/products").send(newProduct);
      assert.equal(response.status, 201, "Status should be 201");
    });
    it("should create a new product", async () => {
      const response = await http.post("/api/products").send(incompleteProduct);
      assert.equal(response.status, 201, "Status should be 201");
    });
  });
  describe("GET /api/products", () => {
    it("should return a list of products", async () => {
      const response = await http.get("/api/products");
      assert.equal(response.status, 200, "Status should be 200");
    });
  });
});

after(async () => {
  await productModel.deleteMany({});
  await mongoose.connection.close();
  server.close();
});
