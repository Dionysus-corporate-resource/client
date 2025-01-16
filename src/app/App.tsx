import { Route, Routes } from "react-router";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import AuthLayout from "../pages/auth-layout";
import AppLayout from "@/shared/ui/app-layout";
import SubscribePage from "@/pages/subscribe/subscribe-page";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="subscribe" element={<SubscribePage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default App;
