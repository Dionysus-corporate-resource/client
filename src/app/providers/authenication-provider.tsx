import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth-provider";

export default function Authentication({ children }: { children: ReactNode }) {
  const authContext = useAuth();
  const location = useLocation();

  // console.log("authContext?.token", authContext?.token);

  if (!authContext?.token) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  return children;
}
