import ForgotPasswordPage from "../pages/common/ForgotPasswordPage";
import LoginPage from "../pages/common/LoginPage";
import RegisterPage from "../pages/common/RegisterPage";

export const authRoutes = [
  { path: "register", element: <RegisterPage /> },
  { path: "login", element: <LoginPage /> },
  { path: "register", element: <ForgotPasswordPage /> },
];
