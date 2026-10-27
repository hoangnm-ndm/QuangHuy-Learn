import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClientProviderApp } from "./api/queryClient.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProviderApp>
      <App />
    </QueryClientProviderApp>
  </StrictMode>,
);
