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

const updatedProduct = {
  stock: 1000,
};

describe("Products Controller", () => {
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
      const response = await http.get("/api/products");
      assert.equal(response.status, 200, "Status should be 200");
    });
    it("should return a list with just one product", async () => {
      const response = await http.get("/api/products?lim=1");
      assert.equal(response.status, 200, "Status should be 200");
    });
  });
  describe("GET /api/products/:id", () => {
    it("should return a product", async () => {
      const response = await http.get("/api/products");
      const id = response.body.body.docs[0]._id;
      const response2 = await http.get(`/api/products/${id}`);
      assert.equal(response2.status, 200, "Status should be 200");
    });
    it("should return a 500 error", async () => {
      const response = await http.get("/api/products/999");
      assert.equal(response.status, 500, "Status should be 500");
    });
  });
  describe("PUT /api/products/:id", () => {
    it("should update a product", async () => {
      const response = await http.get("/api/products");
      const id = response.body.body.docs[0]._id;
      const response2 = await http
        .put(`/api/products/${id}`)
        .send(updatedProduct);
      assert.equal(response2.status, 200, "Status should be 200");
    });
    it("should return a 500 error", async () => {
      const response = await http.put("/api/products/999").send(updatedProduct);
      assert.equal(response.status, 500, "Status should be 500");
    });
  });
  describe("DELETE /api/products/:id", () => {
    it("should delete a product", async () => {
      const response = await http.get("/api/products");
      const id = response.body.body.docs[0]._id;
      const response2 = await http.delete(`/api/products/${id}`);
      assert.equal(response2.status, 200, "Status should be 200");
    });
    it("should return a 500 error", async () => {
      const response = await http.delete("/api/products/999");
      assert.equal(response.status, 500, "Status should be 500");
    });
  });
});

after(async () => {
  await productModel.deleteMany({});
  await mongoose.connection.close();
  server.close();
});
