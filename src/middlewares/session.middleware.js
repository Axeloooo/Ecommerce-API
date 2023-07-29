import MongoStore from "connect-mongo";
import session from "express-session";
import { MONGO_URL } from "../config/database.config.js";

export default session({
  store: MongoStore.create({ mongoUrl: MONGO_URL }),
  saveUninitialized: false,
  resave: false,
  cookie: {
    secure: process.env.NODE_ENV === "PROD",
    sameSite: process.env.NODE_ENV === "PROD" ? "none" : "lax",
    maxAge:
      process.env.NODE_ENV === "TEST" ? 60 * 10000 : 1000 * 60 * 60 * 24 * 7,
  },
  secret: "SESSION_SECRET",
});
