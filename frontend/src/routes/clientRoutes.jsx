import AboutPage from "../pages/client/AboutPage";
import HomePage from "../pages/client/HomePage";
import ProductPage from "../pages/client/ProductPage";

export const clientRoutes = [
  { path: "", element: <HomePage /> },
  { path: "san-pham", element: <ProductPage /> },
  { path: "ve-chung-toi", element: <AboutPage /> },
];
