import jwt from "jsonwebtoken";
import { envConfig } from "../../config/env.config.js";

export const signAccessToken = (userId) =>
  jwt.sign({ userId }, envConfig.JWT_ACCESS_SECRET, {
    expiresIn: "1h",
  });

export const signRefreshToken = (userId) =>
  jwt.sign(userId, envConfig.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });

export const verifyAccessToken = (token) => {};
export const verifyRefreshToken = (token) => {};
