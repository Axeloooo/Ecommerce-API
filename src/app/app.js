// General imports
import express from "express";
import handlebars from "express-handlebars";
import passport from "passport";
import cors from "cors";

// Config imports
import { PORT } from "../config/server.config.js";
import { connectDatabase } from "../database/mongodb.database.js";
import { initializePassport } from "../config/passport.config.js";
import { CORS } from "../config/cors.config.js";

// Api imports
import { cartsApiRouter } from "../routes/api/carts.router.js";
import { productsApiRouter } from "../routes/api/products.router.js";
import { sessionsApiRouter } from "../routes/api/sessions.router.js";
import { usersApiRouter } from "../routes/api/users.router.js";
import { mockingApiRouter } from "../routes/api/mocking.router.js";
import { paymentsApiRouter } from "../routes/api/payments.router.js";

// View imports
import { cartsViewsRouter } from "../routes/web/carts.router.js";
import { productsViewsRouter } from "../routes/web/products.router.js";
import { loggerViewRouter } from "../routes/web/logger.router.js";
import { docsViewRouter } from "../routes/web/docs.router.js";

// Auth imports
import { registerAuthRouter } from "../routes/auth/register.router.js";
import { loginAuthRouter } from "../routes/auth/login.router.js";

// Middleware imports
import session from "../middlewares/session.middleware.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";
import { errorHandler } from "../middlewares/error.middleware.js";
import { addLogger } from "../middlewares/logger.middleware.js";

import dotenv from "dotenv";

dotenv.config();

export const app = express();

await connectDatabase();

app.engine("handlebars", handlebars.engine());

app.set("views", "./views");
app.set("view engine", "handlebars");

process.env.NODE_ENV === "TEST" ? app.use(cors()) : app.use(cors(CORS));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.set("trust proxy", 1);

// Passport middleware
app.use(session);
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Logger middleware
app.use(addLogger);

// Redirect to products
app.get("/", (req, res) => {
  res.redirect("/products");
});

// Auth routes
app.use("/auth/register", registerAuthRouter);

app.use("/auth/login", loginAuthRouter);

// Api routes
process.env.NODE_ENV === "TEST"
  ? app.use("/api/carts", cartsApiRouter)
  : app.use("/api/carts", authenticate, cartsApiRouter);

process.env.NODE_ENV === "TEST"
  ? app.use("/api/products", productsApiRouter)
  : app.use("/api/products", authenticate, productsApiRouter);

process.env.NODE_ENV === "TEST"
  ? app.use("/api/users", usersApiRouter)
  : app.use("/api/users", authenticate, usersApiRouter);

process.env.NODE_ENV === "TEST"
  ? app.use("/api/payments", paymentsApiRouter)
  : app.use("/api/payments", authenticate, paymentsApiRouter);

app.use("/api/mock/products", mockingApiRouter);

app.use("/api/sessions", sessionsApiRouter);

// Web routes
app.use("/carts", authenticate, cartsViewsRouter);

app.use("/products", authenticate, productsViewsRouter);

app.use("/loggerTest", loggerViewRouter);

app.use("/docs", docsViewRouter);

// Errors middleware
app.use(errorHandler);
export const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`);
});
