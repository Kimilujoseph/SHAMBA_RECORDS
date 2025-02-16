import express, { Application } from "express";
import morgan from "morgan";
import session from "express-session";
import MongoDbStore from "connect-mongodb-session";
import cookieParser from "cookie-parser";
import configToken from "./config/index";
const { MONGODB, SESSION_SECRET } = configToken;
import { ErrorHandler } from "./utils/error_handler";
import userroutes from "./API/router/usermanagement";
import setupSwagger from "./config/swagger";
import * as dotenv from "dotenv";
import { Express } from "express";

const MongoDBStoreSession = MongoDbStore(session);

// Create a session store
const store = new MongoDBStoreSession({
  uri: MONGODB,
  collection: "sessions",
});

store.on("error", function (error: any) {
  console.error("Session store error:", error);
});

dotenv.config();

const App = async (app: Application): Promise<void> => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(cookieParser());
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: store,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      },
    })
  );

  app.use(morgan("dev"));

  setupSwagger(app as Express);

  // Routes
  app.use("/api/v1/user", userroutes);

  // Error handling middleware
  app.use(ErrorHandler);
};

export { App };
