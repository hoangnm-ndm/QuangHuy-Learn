import { Router } from "express";
import productController from "./product.controller.js";
import {
  checkAuthentication,
  checkRoles,
} from "../../shared/middlewares/auth.js";

const productRoutes = Router();

productRoutes.get("/", productController.getAll);
productRoutes.get("/:id", productController.getById);

// productRoutes.use(checkAuthentication, checkRoles(["admin", "superAdmin"]));
productRoutes.put("/:id", productController.update);
productRoutes.delete("/:id", productController.remove);
productRoutes.post("/", productController.create);

export default productRoutes;
