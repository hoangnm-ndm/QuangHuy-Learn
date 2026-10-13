import { createBrowserRouter, RouterProvider } from "react-router";
import AdminLayout from "../layouts/admin/AdminLayout";
import {
  default as ClientLayout,
  default as Layout,
} from "../layouts/client/ClientLayout";
import AboutPage from "../pages/client/AboutPage";
import HomePage from "../pages/client/HomePage";
import ProductPage from "../pages/client/ProductPage";
import ForgotPasswordPage from "../pages/common/ForgotPasswordPage";
import LoginPage from "../pages/common/LoginPage";
import NotFoundPage from "../pages/common/NotFoundPage";
import RegisterPage from "../pages/common/RegisterPage";
import { ROLES } from "../shared/constanst";
import { adminRoutes } from "./adminRoutes";
import ProtectedRoute from "./ProtectedRoute";

const AppRoute = () => {
  const router = createBrowserRouter([
    // * Client
    {
      path: "/",
      element: <ClientLayout />,
      children: [
        { path: "", element: <HomePage /> },
        { path: "san-pham", element: <ProductPage /> },
        { path: "ve-chung-toi", element: <AboutPage /> },
      ],
    },

    // Adminb
    {
      path: "/admin",
      element: (
        <ProtectedRoute roles={[ROLES.SUPER_ADMIN, ROLES.ADMIN]}>
          <AdminLayout />
        </ProtectedRoute>
      ),
      children: adminRoutes,
    },

    // Auth
    {
      // notfound
      path: "/auth",
      element: <Layout />,
      children: [
        { path: "register", element: <RegisterPage /> },
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <ForgotPasswordPage /> },
      ],
    },

    { path: "*", element: <NotFoundPage /> },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRoute;
