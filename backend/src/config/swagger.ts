import swaggerJsdoc = require("swagger-jsdoc");
import { Options } from "swagger-jsdoc";

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Secure Task Management API",
      version: "1.0.0",
      description: "API documentation for Secure Task Dashboard",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // read route files for docs
};

export const swaggerSpec = swaggerJsdoc(options);
