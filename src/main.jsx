import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "../eric-portfolio.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
