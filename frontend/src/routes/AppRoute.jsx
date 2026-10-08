import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "../pages/client/HomePage";
import ProductPage from "../pages/client/ProductPage";
import AboutPage from "../pages/client/AboutPage";
import Layout from "../layouts/client/ClientLayout";
import ClientLayout from "../layouts/client/ClientLayout";
import ProtectedRoute from "./ProtectedRoute";
import { DashBoard } from "../pages/admin/DashBoard";
import ProductManagement from "../pages/admin/ProductManagement";
import Settings from "../pages/admin/Settings";
import RegisterPage from "../pages/common/RegisterPage";
import LoginPage from "../pages/common/LoginPage";
import ForgotPasswordPage from "../pages/common/ForgotPasswordPage";
import AdminLayout from "../layouts/admin/AdminLayout";
import { ROLES } from "../shared/constanst";
import NotFoundPage from "../pages/common/NotFoundPage";

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
      children: [
        { path: "", element: <DashBoard /> },
        { path: "san-pham", element: <ProductManagement /> },
        { path: "cai-dat", element: <Settings /> },
      ],
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
