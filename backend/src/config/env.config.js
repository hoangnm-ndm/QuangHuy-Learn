import dotenv from "dotenv";

dotenv.config();

export const envConfig = {
  PORT: process.env.PORT || 3000,
  DB_URI: process.env.DB_URI,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
};
