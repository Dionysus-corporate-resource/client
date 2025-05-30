import { LoginForm } from "@/feature/auth/sign-in";
import { NavLink } from "react-router";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-svh py-6 px-8">
      <NavLink to="/" className="text-base font-medium">
        Груз рынок
      </NavLink>
      <div className="flex-1 w-full h-full flex items-center justify-center">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
