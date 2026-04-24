import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./presentation/routes";
import { errorHandler } from "./presentation/middleware/error.middleware";
import cookieParser from "cookie-parser";
const app = express();
 const corsOptions = {
      origin: "https://shamba.smartgiggs.co.ke", 
      credentials: true, 
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], 
      allowedHeaders: ["Content-Type", "Authorization"], 
    };
    
    app.use(cors(corsOptions)); 

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

//app.get('/health', (req, res) => res.send('OK'));

app.use(errorHandler);

export default app;
