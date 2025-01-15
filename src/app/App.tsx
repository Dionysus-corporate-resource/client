import { Route, Routes } from "react-router";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import AuthLayout from "../pages/auth-layout";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />

      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default App;
