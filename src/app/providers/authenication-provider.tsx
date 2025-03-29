import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth-provider";
import { IPermissions, IUserRoles } from "@/shared/model/types/user";


export default function Authentication({
  children,
  permissions,
  role
}: {
  children: ReactNode;
  permissions?: IPermissions[];
  role?: IUserRoles
}) {
  const authContext = useAuth();
  const location = useLocation();

  if (permissions && authContext?.user?.permissions && permissions?.some(role => authContext?.user?.permissions.includes(role)) === false) {
    // Если мы указали permissions, то проверяем, чтобы у пользователя хотя одна роль была из указанных в пропсе
    return <Navigate to="/" />
  }

  if (
    role &&
    authContext?.user?.roles &&
    role.includes(authContext?.user?.roles) === false
  ) {
    return <Navigate to="/" />;
  }

  if (!authContext?.token) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  return children;
}
