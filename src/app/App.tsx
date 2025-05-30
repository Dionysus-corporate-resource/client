import { Route, Routes } from "react-router";
import AuthLayout from "../shared/ui/auth-layout";
import AppLayout from "@/shared/ui/app-layout";
import LoginPage from "@/pages/auth/sign-in/login-page";
import RegisterPage from "@/pages/auth/sign-up/register-page";
import ProfilePage from "@/pages/auth/profile/profile";
import NotFound from "@/pages/not-found/not-found";
import Authentication from "./providers/authenication-provider";
import SuccessPage from "@/pages/payment/payment-success";
import ErrorPage from "@/pages/payment/payment-failed";
import ProposalsPage from "@/pages/proposals/proposals-page";
import AnalyticsPage from "@/pages/analytics/analytics-page";
// import usePageView from "@/shared/hooks/use-page-view";
import EditProfilePage from "@/pages/auth/profile/edit-profile-page";
import { PublicBookingPage } from "@/pages/home";
import ChooseCreateBookingPage from "@/pages/create-booking/choose-create-booking-page";
import CreateShortBookingPage from "@/pages/create-booking/create-short-booking-page";
import CreateDetailBookingPage from "@/pages/create-booking/create-detail-booking-page";
import MyBookingPage from "@/pages/my-booking/my-booking";
import EditDetailBookingPage from "@/pages/edit-booking/edit-detail-booking";
import EditShortBookingPage from "@/pages/edit-booking/edit-short-booking";
import SubscribePage from "@/pages/subscribe/subscribe-page";
import MobileBlock from "@/shared/ui/mobile-block";
import useMobileCheck from "@/shared/hooks/use-mobile-check";

function App() {
  // usePageView();
  const isMobile = useMobileCheck();

  return isMobile ? (
    <MobileBlock />
  ) : (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="" element={<PublicBookingPage />} />

        <Route path="subscribe" element={<SubscribePage />} />
        <Route
          path="profile"
          element={
            <Authentication>
              <ProfilePage />
            </Authentication>
          }
        />
        <Route
          path="edit-profile"
          element={
            <Authentication>
              <EditProfilePage />
            </Authentication>
          }
        />
        <Route
          path="my-booking"
          element={
            <Authentication>
              <MyBookingPage />
            </Authentication>
          }
        />
        <Route
          path="edit-booking-short/:bookingId"
          element={
            <Authentication>
              <EditShortBookingPage />
            </Authentication>
          }
        />
        <Route
          path="edit-booking-detail/:bookingId"
          element={
            <Authentication>
              <EditDetailBookingPage />
            </Authentication>
          }
        />
        <Route
          path="create-booking"
          element={
            <Authentication>
              <ChooseCreateBookingPage />
            </Authentication>
          }
        />
        <Route
          path="create-booking/short"
          element={
            <Authentication>
              <CreateShortBookingPage />
            </Authentication>
          }
        />
        <Route
          path="create-booking/detail"
          element={
            <Authentication>
              <CreateDetailBookingPage />
            </Authentication>
          }
        />

        <Route
          path="analytics"
          element={
            <Authentication permissions={["admin"]}>
              <AnalyticsPage />
            </Authentication>
          }
        />

        <Route path="/payment-success" element={<SuccessPage />} />
        <Route path="/payment-failed" element={<ErrorPage />} />
        <Route
          path="/proposals"
          element={
            <Authentication>
              <ProposalsPage />
            </Authentication>
          }
        />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
