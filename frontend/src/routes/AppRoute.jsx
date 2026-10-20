import { createBrowserRouter, RouterProvider } from "react-router";
import AdminLayout from "../layouts/admin/AdminLayout";
import {
  default as ClientLayout,
  default as Layout,
} from "../layouts/client/ClientLayout";
import NotFoundPage from "../pages/common/NotFoundPage";
import { ROLES } from "../shared/constanst";
import { adminRoutes } from "./adminRoutes";
import { authRoutes } from "./authRoutes";
import { clientRoutes } from "./clientRoutes";
import ProtectedRoute from "./ProtectedRoute";

const AppRoute = () => {
  const router = createBrowserRouter([
    // * Client
    {
      path: "/",
      element: <ClientLayout />,
      children: clientRoutes,
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
      children: authRoutes,
    },

    { path: "*", element: <NotFoundPage /> },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRoute;
