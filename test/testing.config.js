import supertest from "supertest";
import mongoose from "mongoose";

import { app, server } from "../src/app/app.js";
import { after } from "mocha";

export const http = supertest(app);

export async function endOfTests() {
  after(async () => {
    await mongoose.connection.close();
    await server.close();
  });
}
