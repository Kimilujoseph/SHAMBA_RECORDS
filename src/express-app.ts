import express, { Application } from "express";
//import cors from "cors";
import { ErrorHandler } from "./utils/error_handler";
import * as dotenv from "dotenv";
dotenv.config();

const App = async (app: Application): Promise<void> => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  //   app.use(
  //     cors({
  //       origin: ["*"],
  //       credentials: true,
  //     })
  //   );
  app.use(ErrorHandler);
};

export { App };
