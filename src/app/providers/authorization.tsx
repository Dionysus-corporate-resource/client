import { ReactNode } from "react";
import { useAuth } from "./auth-provider";

type IProps = {
  permissions: string[];
  children: ReactNode;
};

export default function Authorization({ permissions, children }: IProps) {
  const context = useAuth();

  console.log("contextUser", context?.user?.userName);

  if (context?.user) {
    const userPermission = context.user.roles;
    const isAllowed = permissions.some((allowed) =>
      userPermission.includes(allowed),
    );

    console.log("isAllowed", isAllowed);

    return isAllowed ? children : <div>У вас не прав для этой страницы(</div>;
  }

  return <div>У вас пользователя</div>;
}
