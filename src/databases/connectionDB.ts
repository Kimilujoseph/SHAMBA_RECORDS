import mongoose from "mongoose";
import configToken from "../config/index";

interface mongoUrlConfig {
  MONGODB?: string;
}

const { MONGODB }: mongoUrlConfig = configToken;

const connectDB = async (): Promise<void> => {
  try {
    if (MONGODB) {
      await mongoose.connect(MONGODB);
      console.log("✅ MongoDB successfully connected.");
    } else {
      console.log(" ❌ database string not found");
    }
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB.", error);
    process.exit(1);
  }
};

export default connectDB;
