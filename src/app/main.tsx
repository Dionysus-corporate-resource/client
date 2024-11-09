import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import BrowserProvider from "./providers/browser-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserProvider>
      <App />
    </BrowserProvider>
  </StrictMode>,
);
