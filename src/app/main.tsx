import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import BrowserProvider from "./providers/browser-provider.tsx";
import { AuthProvider } from "./providers/auth-provider.tsx";
import QueryProvider from "./providers/query-client-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserProvider>
      <AuthProvider>
        <QueryProvider>
          <App />
        </QueryProvider>
      </AuthProvider>
    </BrowserProvider>
  </StrictMode>,
);
