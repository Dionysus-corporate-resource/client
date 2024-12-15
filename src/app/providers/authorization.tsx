import { ReactNode } from "react";
import { useAuth } from "./auth-provider";
import { IRolesCorporate } from "@/shared/model/types/user";

type IProps = {
  permissions: string[];
  children: ReactNode;
};

export default function Authorization({ permissions, children }: IProps) {
  const context = useAuth();

  // console.log("contextUser", context?.user?.userData?.userName);

  if (context?.user) {
    const userPermission = context.user?.corporateRoles;
    const isAllowed = permissions.some((allowed) =>
      userPermission.includes(allowed as IRolesCorporate),
    );

    // console.log("isAllowed", isAllowed);

    return isAllowed ? children : <div>У вас не прав для этой страницы(</div>;
  }

  return <div>У вас пользователя</div>;
}
