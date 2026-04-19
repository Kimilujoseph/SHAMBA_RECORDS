import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./presentation/routes";
import { errorHandler } from "./presentation/middleware/error.middleware";
import cookieParser from "cookie-parser";

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

//app.get('/health', (req, res) => res.send('OK'));

app.use(errorHandler);

export default app;
