import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "../pages/client/HomePage";
import ProductPage from "../pages/client/ProductPage";
import AboutPage from "../pages/client/AboutPage";
import Layout from "../layouts/client/ClientLayout";
import ClientLayout from "../layouts/client/ClientLayout";

const AppRoute = () => {
  const router = createBrowserRouter([
    // * Client
    {
      path: "/",
      element: <ClientLayout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/san-pham", element: <ProductPage />, b },
        { path: "/ve-chung-toi", element: <AboutPage /> },
      ],
    },

    // Adminb
    {
      path: "/admin",
      element: <ClientLayout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/san-pham", element: <ProductPage /> },
        { path: "/ve-chung-toi", element: <AboutPage /> },
      ],
    },

    // Common
    {
      // notfound
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRoute;
