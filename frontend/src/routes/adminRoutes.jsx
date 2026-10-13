import { DashBoard } from "../pages/admin/DashBoard";
import ProductFormPage from "../pages/admin/product/ProductFormPage";
import ProductManagement from "../pages/admin/product/ProductManagement";
import Settings from "../pages/admin/Settings";

export const adminRoutes = [
  { path: "", element: <DashBoard /> },
  { path: "san-pham", element: <ProductManagement /> },
  { path: "san-pham/update/:id", element: <ProductFormPage /> },
  { path: "san-pham/add", element: <ProductFormPage /> },
  { path: "cai-dat", element: <Settings /> },
];
