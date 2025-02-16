import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { signupSchema, signinSchema } from "./swaggerDef";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your API Documentation",
      version: "1.0.0",
      description: "API documentation for your system",
    },
    servers: [{ url: "http://localhost:5000" }],
    components: {
      schemas: {
        Signup: signupSchema,
        Signin: signinSchema,
      },
    },
  },
  apis: ["./src/API/router/*.ts"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

export default setupSwagger;
