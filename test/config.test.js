import supertest from "supertest";
import mongoose from "mongoose";

import { app, server } from "../src/app/app.js";
import { after } from "mocha";

import { productModel } from "../src/daos/mongo/product.dao.js";
import { userModel } from "../src/daos/mongo/user.dao.js";

export const http = supertest.agent(app);

after(async () => {
  await productModel.deleteMany({});
  await userModel.deleteMany({});
  await mongoose.connection.close();
  server.close();
});

export async function endOfProductTest() {
  await productModel.deleteMany({});
}

export async function endOfUserTest() {
  await userModel.deleteMany({});
}
