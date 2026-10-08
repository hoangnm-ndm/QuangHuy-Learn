import { Router } from "express";
import productRoutes from "../modules/product/product.route.js";
import authRoutes from "../modules/auth/auth.route.js";

const routes = Router();

routes.use("/products", productRoutes);
routes.use("/auth", authRoutes);
// routes.use("/products", productRoutes);
// routes.use("/products", productRoutes);

export default routes;
