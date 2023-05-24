import mongoose from "mongoose";
import { MONGO_URL } from "../config/database.config.js";

export async function connectDatabase() {
  try {
    const connection = await mongoose.connect(MONGO_URL);
    if (!connection) {
      throw new Error("Error connecting with database");
    }
    console.log("Connection with database successful!\n", connection);
  } catch (error) {
    console.error(error);
  }
}
