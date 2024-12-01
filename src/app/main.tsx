import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import BrowserProvider from "./providers/browser-provider.tsx";
import { AuthProvider } from "./providers/auth-provider.tsx";
import QueryProvider from "./providers/query-client-provider.tsx";

import { ThemeProvider } from "@gravity-ui/uikit";

import "@gravity-ui/uikit/styles/fonts.css";
import "@gravity-ui/uikit/styles/styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserProvider>
      <AuthProvider>
        <QueryProvider>
          <ThemeProvider theme="light">
            <App />
          </ThemeProvider>
        </QueryProvider>
      </AuthProvider>
    </BrowserProvider>
  </StrictMode>,
);
