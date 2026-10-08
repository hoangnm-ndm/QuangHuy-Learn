import { Router } from "express";
import productController from "./product.controller.js";
import {
  checkAuthentication,
  checkRoles,
} from "../../shared/middlewares/auth.js";

const productRoutes = Router();

// productRoutes.get("/", productController.getAllProduct);
// productRoutes.get("/:id", productController.getProductById);
productRoutes.post(
  "/",
  checkAuthentication,
  checkRoles(["admin, superAdmin"]),
  productController.createProduct,
);

export default productRoutes;
