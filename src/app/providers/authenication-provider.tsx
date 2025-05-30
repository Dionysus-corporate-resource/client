import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth-provider";
import { IPermissions, IUserRoles } from "@/shared/model/types/user";

export default function Authentication({
  children,
  permissions,
  role,
}: {
  children: ReactNode;
  permissions?: IPermissions[];
  role?: IUserRoles;
}) {
  const {
    user: { userData },
    token,
  } = useAuth();
  const location = useLocation();

  if (
    permissions &&
    userData?.permissions &&
    permissions?.some((role) => userData.permissions.includes(role)) === false
  ) {
    // Если мы указали permissions, то проверяем, чтобы у пользователя хотя одна роль была из указанных в пропсе
    return <Navigate to="/" />;
  }

  if (role && userData?.roles && role.includes(userData?.roles) === false) {
    return <Navigate to="/" />;
  }

  if (!token) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  return children;
}
