import { Router } from "express";
import { authController } from "./auth.controller.js";
import { validate } from "../../shared/middlewares/validate.js";
import { loginSchema, registerSchema } from "./auth.schema.js";

const authRoutes = Router();

authRoutes.post(
  "/register",
  validate({ body: registerSchema }),
  authController.register,
);

authRoutes.post(
  "/login",
  validate({ body: loginSchema }),
  authController.login,
);

export default authRoutes;
