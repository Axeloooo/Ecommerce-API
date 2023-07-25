import { beforeEach } from "mocha";
import { assert } from "chai";

import { endOfProductTest, endOfUserTest, http } from "../config.test.js";

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

const updatedProduct = {
  stock: 1000,
};

describe("Products Controller", () => {
  beforeEach(async () => {
    await endOfProductTest();
  });

  describe("POST /api/products", () => {
    it("should create a new product", async () => {
      const response = await http.post("/api/products").send(newProduct);
      assert.equal(response.status, 201, "Status should be 201");
    });

    it("should create a new product with incomplete/empty fields", async () => {
      const response = await http.post("/api/products").send(incompleteProduct);
      assert.equal(response.status, 201, "Status should be 201");
    });
  });

  describe("GET /api/products", () => {
    it("should return a list of products", async () => {
      const _ = await http.post("/api/products").send(newProduct);
      const response = await http.get("/api/products");
      assert.equal(response.status, 200, "Status should be 200");
      assert.isArray(
        response.body.body.docs,
        "Response should contain an array of products"
      );
      assert.lengthOf(
        response.body.body.docs,
        1,
        "Response should contain one product"
      );
    });

    it("should return a list with just one product", async () => {
      const _ = await http.post("/api/products").send(newProduct);
      const response = await http.get("/api/products?lim=1");
      assert.equal(response.status, 200, "Status should be 200");
      assert.isArray(response.body.body.docs);
      assert.lengthOf(
        response.body.body.docs,
        1,
        "Response should contain one product"
      );
    });
  });

  describe("GET /api/products/:id", () => {
    it("should return a product", async () => {
      const createdProduct = await http.post("/api/products").send(newProduct);
      const response = await http.get(
        `/api/products/${createdProduct.body.body._id}`
      );
      assert.equal(response.status, 200, "Status should be 200");
      assert.deepEqual(
        response.body.body,
        createdProduct.body.body,
        "Returned product should match the created product"
      );
    });

    it("should return a 500 error for an invalid product ID", async () => {
      const response = await http.get("/api/products/999");
      assert.equal(response.status, 500, "Status should be 500");
    });
  });

  describe("PUT /api/products/:id", () => {
    it("should update a product", async () => {
      const createdProduct = await http.post("/api/products").send(newProduct);
      const response = await http
        .put(`/api/products/${createdProduct.body.body._id}`)
        .send(updatedProduct);
      assert.equal(response.status, 200, "Status should be 200");
      assert.deepEqual(
        response.body.body,
        { ...createdProduct.body.body, ...updatedProduct },
        "Updated product should match the request"
      );
    });

    it("should return a 500 error for an invalid product ID", async () => {
      const response = await http.put("/api/products/999").send(updatedProduct);
      assert.equal(response.status, 500, "Status should be 500");
    });
  });

  describe("DELETE /api/products/:id", () => {
    it("should delete a product", async () => {
      const createdProduct = await http.post("/api/products").send(newProduct);
      const response = await http.delete(
        `/api/products/${createdProduct.body.body._id}`
      );
      assert.equal(response.status, 200, "Status should be 200");
      assert.deepEqual(
        response.body.body,
        createdProduct.body.body,
        "Deleted product should match the request"
      );
    });

    it("should return a 500 error for an invalid product ID", async () => {
      const response = await http.delete("/api/products/999");
      assert.equal(response.status, 500, "Status should be 500");
    });
  });
});
