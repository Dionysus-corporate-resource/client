import { RegisterForm } from "@/feature/auth/sign-up";
import { NavLink } from "react-router";

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-svh py-6 px-8">
      <NavLink to="/" className="text-base font-medium">
        Груз рынок
      </NavLink>
      <div className="flex-1 w-full h-full flex items-center justify-center">
        <div className="max-w-sm">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
