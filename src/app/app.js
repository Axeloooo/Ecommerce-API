// General imports
import express from "express";
import handlebars from "express-handlebars";

// Config imports
import { PORT } from "../config/server.config.js";
import { connectDatabase } from "../database/mongodb.database.js";

// Api imports
import { cartsApiRouter } from "../routes/api/carts.router.js";
import { productsApiRouter } from "../routes/api/products.router.js";
import { sessionsApiRouter } from "../routes/api/sessions.router.js";

// View imports
import { cartsViewsRouter } from "../routes/web/carts.router.js";
import { productsViewsRouter } from "../routes/web/products.router.js";

// Auth imports
import { registerAuthRouter } from "../routes/auth/register.router.js";
import { loginAuthRouter } from "../routes/auth/login.router.js";

// Middleware imports
import session from "../middlewares/session.middleware.js";
import { log } from "../middlewares/log.middleware.js";
import { errorHandler } from "../middlewares/error.middleware.js";

const app = express();

const connection = await connectDatabase();

app.engine("handlebars", handlebars.engine());

app.set("views", "./views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.use(session);

app.use("/auth/register", registerAuthRouter);
app.use("/auth/login", loginAuthRouter);

app.use("/api/carts", cartsApiRouter);
app.use("/api/products", productsApiRouter);
app.use("/api/sessions", sessionsApiRouter);

app.use("/carts", log, cartsViewsRouter);
app.use("/products", log, productsViewsRouter);

app.get("/", (req, res, next) => {
  try {
    let user = {
      name: "Axel",
    };
    res.render("index", user);
  } catch (err) {
    next(err);
  }
});

app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`);
});
