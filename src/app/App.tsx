import { Route, Routes } from "react-router";
import HomePage from "../pages/home";
import AuthLayout from "../pages/auth-layout";
import AppLayout from "@/shared/ui/app-layout";
import SubscriptionsPage from "@/pages/subscribe/subscribe-page";
import SubscriptionsPageShort from "@/pages/subscribe/subscribe-page-short";
import LandingLayout from "@/shared/ui/landing-layout";
import LandingPage from "@/pages/landing/landing-page";
import LoginPage from "@/pages/auth/sign-in/login-page";
import RegisterPage from "@/pages/auth/sign-up/register-page";

function App() {
  return (
    <Routes>
      <Route path="landing" element={<LandingLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="subscribe" element={<SubscriptionsPage />} />
      </Route>

      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="subscribe" element={<SubscriptionsPageShort />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default App;
