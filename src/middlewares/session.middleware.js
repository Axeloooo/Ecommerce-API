import MongoStore from "connect-mongo";
import session from "express-session";
import { MONGO_URL } from "../config/database.config.js";

export default session({
  store: MongoStore.create({ mongoUrl: MONGO_URL }),
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge:
      process.env.NODE_ENV === "TEST" ? 60 * 10000 : 1000 * 60 * 60 * 24 * 7,
    sameSite: process.env.NODE_ENV === "TEST" ? "lax" : "none",
    secure: process.env.NODE_ENV === "TEST" ? false : true,
  },
  secret: "SESSION_SECRET",
});
