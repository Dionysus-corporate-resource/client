import { Route, Routes } from "react-router-dom";
import { AppLayout } from "./layouts/app-layout";
import HomePage from "@/pages/home";
import NotFound from "@/pages/auth/not-found/not-found";
import Landing from "@/pages/landing/landingPage";
import LoginPage from "@/pages/auth/sign-in/login-page";
import RegisterPage from "@/pages/auth/sign-up/register-page";
import Authentication from "./providers/authenication-provider";
import Authorization from "./providers/authorization";
import PERMISSIONS from "@/shared/api/permissions";
import ManagerPage from "@/pages/manager/manager-page";
import ProposalsDevelopmentPage from "@/pages/proposals-development/ui/proposals-development-page";
import ProfilePage from "@/pages/auth/profile/profile-page";
import { SignPage } from "@/pages/auth/corporate-resource";
import {
  FlightDispatcherPage,
  FlightGeneralDirectorPage,
  FlightManagerPage,
} from "../pages/flight";

export default function App() {
  return (
    <Routes>
      <Route path="/product" element={<AppLayout />}>
        <Route
          index
          element={
            <Authentication>
              <HomePage />
            </Authentication>
          }
        />
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
            <Authentication>
              <Authorization
                permissions={[
                  PERMISSIONS.CAN_VIEW_MANAGER,
                  PERMISSIONS.CAN_VIEW_SUPERADMIN,
                  PERMISSIONS.CAN_VIEW_GENERAL_DIRECTOR,
                ]}
              >
                <ManagerPage />
              </Authorization>
            </Authentication>
          }
        />
        <Route
          path="/product/proposals-development"
          element={
            <Authentication>
              <Authorization
                permissions={[
                  PERMISSIONS.CAN_VIEW_MANAGER,
                  PERMISSIONS.CAN_VIEW_DISPATCHER,
                  PERMISSIONS.CAN_VIEW_SUPERADMIN,
                  PERMISSIONS.CAN_VIEW_GENERAL_DIRECTOR,
                ]}
              >
                <ProposalsDevelopmentPage />
              </Authorization>
            </Authentication>
          }
        />
        <Route
          path="/product/flight-dispatcher"
          element={
            <Authentication>
              <Authorization
                permissions={[
                  PERMISSIONS.CAN_VIEW_DISPATCHER,
                  PERMISSIONS.CAN_VIEW_SUPERADMIN,
                ]}
              >
                <FlightDispatcherPage />
              </Authorization>
            </Authentication>
          }
        />
        <Route
          path="/product/flight-manager"
          element={
            <Authentication>
              <Authorization
                permissions={[
                  PERMISSIONS.CAN_VIEW_MANAGER,
                  PERMISSIONS.CAN_VIEW_SUPERADMIN,
                  PERMISSIONS.CAN_VIEW_GENERAL_DIRECTOR,
                ]}
              >
                <FlightManagerPage />
              </Authorization>
            </Authentication>
          }
        />

        <Route
          path="/product/flight-general-director"
          element={
            <Authentication>
              <Authorization
                permissions={[
                  PERMISSIONS.CAN_VIEW_SUPERADMIN,
                  PERMISSIONS.CAN_VIEW_GENERAL_DIRECTOR,
                ]}
              >
                <FlightGeneralDirectorPage />
              </Authorization>
            </Authentication>
          }
        />
      </Route>

      <Route path="/*" element={<NotFound />} />
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/company-login" element={<SignPage />} />
    </Routes>
  );
}
