import * as dotenv from "dotenv";
const envFile =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env";
dotenv.config({ path: envFile });
interface configvalue {
  APP_SECRET: string;
}

const configToken: configvalue = {
  APP_SECRET: process.env.APP_SECRET || "",
};

export default configToken;
