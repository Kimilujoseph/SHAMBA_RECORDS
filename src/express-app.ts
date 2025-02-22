import express, { Application } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import configToken from "./config/index";
import { ErrorHandler } from "./utils/error_handler";
import setupSwagger from "./config/swagger";
import * as dotenv from "dotenv";
import { Express } from "express";

dotenv.config();

const App = async (app: Application): Promise<void> => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(cookieParser());

  app.use(morgan("dev"));

  setupSwagger(app as Express);

  // Routes

  // Error handling middleware
  app.use(ErrorHandler);
};

export { App };
