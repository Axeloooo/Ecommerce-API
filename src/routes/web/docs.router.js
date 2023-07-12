import { Router } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

export const docsViewRouter = Router();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-commerce API Documentation",
      description: "Documentation for the endpoints of the E-commerce API",
      version: "1.0.0",
    },
  },
  apis: ["./docs/**/*.yaml"],
};

const specs = swaggerJsdoc(swaggerOptions);

docsViewRouter.use("/", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
