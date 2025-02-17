import * as dotenv from "dotenv";
const envFile =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env";
dotenv.config({ path: envFile });
interface configvalue {
  MONGODB: string;
  APP_SECRET: string;
  SESSION_SECRET: string;
  RESEND_API: string;
}

const configToken: configvalue = {
  MONGODB: process.env.MONGODB || "mongodb://localhost:27017/safaricarpool",
  APP_SECRET: process.env.APP_SECRET || "",
  SESSION_SECRET: process.env.SESSION_SECRET || "S",
  RESEND_API: process.env.RESEND_API || "",
};

export default configToken;
