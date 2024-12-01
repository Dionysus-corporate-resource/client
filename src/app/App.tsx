import { Route, Routes } from "react-router-dom";
import { AppLayout } from "./layouts/app-layout";
import HomePage from "@/pages/home";
import NotFound from "@/pages/auth/not-found/not-found";
import Landing from "@/pages/landing/landingPage";
import LoginPage from "@/pages/auth/sign-in/login-page";
import RegisterPage from "@/pages/auth/sign-up/register-page";
import Authentication from "./providers/authenication-provider";
import ProfilePage from "@/pages/auth/profile/profile-page";
import Authorization from "./providers/authorization";
import PERMISSIONS from "@/shared/api/permissions";
import ManagerPage from "@/pages/manager/manager-page";
import ProposalsDevelopmentPage from "@/pages/proposals-development/ui/proposals-development-page";

export default function App() {
  return (
    <Routes>
      <Route path="/product" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="/product/profile"
          element={
            <Authentication>
              <ProfilePage />
            </Authentication>
          }
        />
        <Route
          path="/product/manager"
          element={
            <Authorization
              permissions={[
                PERMISSIONS.CAN_VIEW_MANAGER,
                PERMISSIONS.CAN_VIEW_SUPERADMIN,
              ]}
            >
              <ManagerPage />
            </Authorization>
          }
        />
        <Route
          path="/product/proposals-development"
          element={
            <Authorization
              permissions={[
                PERMISSIONS.CAN_VIEW_MANAGER,
                PERMISSIONS.CAN_VIEW_DISPATCHER,
                PERMISSIONS.CAN_VIEW_SUPERADMIN,
              ]}
            >
              <ProposalsDevelopmentPage />
            </Authorization>
          }
        />
      </Route>

      <Route path="/*" element={<NotFound />} />
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}
