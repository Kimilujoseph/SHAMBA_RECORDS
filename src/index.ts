import express, { Application } from "express";
import connectDB from "./databases/connectionDB";
import { App } from "./express-app";
import * as dotenv from "dotenv";

dotenv.config();

const PORT: number = parseInt(process.env.PORT || "3000");

const startServer = async (): Promise<void> => {
  const app: Application = express();
  await connectDB();
  await App(app);
  app
    .listen(PORT, () =>
      console.log(`✅ The application is successfully running  ${PORT}`)
    )
    .on("error", (err) => {
      console.log(err);
      process.exit(1);
    });
};

startServer();
