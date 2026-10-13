import mongoose from "mongoose";
import { envConfig } from "./env.config.js";

function connectDB() {
  mongoose
    .connect(envConfig.DB_URI)
    .then(() => {
      console.log("Connect DB successfully!");
    })
    .catch((err) => {
      console.log("Connect DB failed!", err);
    });
}

export default connectDB;
