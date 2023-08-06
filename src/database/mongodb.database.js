import mongoose from "mongoose";
import { MONGO_URL } from "../config/database.config.js";
import { InternalServerError } from "../errors/errors.js";

export async function connectDatabase() {
  try {
    const connection = await mongoose.connect(MONGO_URL);
    if (!connection) {
      throw new InternalServerError("Error connecting with database");
    }
    console.log(
      `Connection successful with database ${connection.connection.name}`
    );
  } catch (error) {
    console.error(error);
  }
}
