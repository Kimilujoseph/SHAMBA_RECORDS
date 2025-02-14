import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express, Application } from "express";

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Taxi API",
      version: "1.0.0",
      description: "API documentation for Taxi Management System",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local server",
      },
    ],
  },
  apis: ["./src/API/router/*.ts"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const setupSwagger = (app: Application) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(
    "Swagger documentation available at: http://localhost:5000/api-docs"
  );
};

export default setupSwagger;
