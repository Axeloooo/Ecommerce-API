import dotenv from "dotenv";

dotenv.config();

export const MONGO_URL =
  process.env.NODE_ENV === "TEST"
    ? process.env.MONGO_TESTING_URL
    : process.env.MONGO_URL;
