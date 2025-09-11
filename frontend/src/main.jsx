import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ThemeProvider from "./customHooks/ThemeProvider.jsx";
import TokenProvider from "./customHooks/TokenProvider.jsx";
import IdProvider from "./customHooks/IdProvider.jsx";
createRoot(document.getElementById("root")).render(
  <TokenProvider>
    <IdProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </IdProvider>
  </TokenProvider>
);
