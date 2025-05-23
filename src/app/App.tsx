import { Route, Routes } from "react-router";
import AuthLayout from "../shared/ui/auth-layout";
import AppLayout from "@/shared/ui/app-layout";

import LoginPage from "@/pages/auth/sign-in/login-page";
import RegisterPage from "@/pages/auth/sign-up/register-page";
import ProfilePage from "@/pages/auth/profile/profile";
import NotFound from "@/pages/not-found/not-found";
import MyBooking from "@/pages/my-booking/my-booking";
import CreateBookingPage from "@/pages/create-booking/create-booking-page";
import Authentication from "./providers/authenication-provider";
import SuccessPage from "@/pages/payment/payment-success";
import ErrorPage from "@/pages/payment/payment-failed";
import PublicBookingPage from "../pages/home/public-booking-page";
import ProposalsPage from "@/pages/proposals/proposals-page";
import EditBookingPage from "@/pages/edit-booking/edit-booking";
import AnalyticsPage from "@/pages/analytics/analytics-page";
import usePageView from "@/shared/hooks/use-page-view";
import NewPublicBookingPage from "@/pages/home/new-public-booking-page";
import EditProfilePage from "@/pages/auth/profile/edit-profile-page";
// import SubscriptionsPageShort from "@/pages/subscribe/subscribe-page-short";

function App() {
  usePageView();

  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* <Route path="" element={<PublicBookingPage />} /> */}
        <Route path="" element={<NewPublicBookingPage />} />

        {/* <Route path="subscribe" element={<SubscriptionsPageShort />} /> */}
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
              <MyBooking />
            </Authentication>
          }
        />
        <Route
          path="edit-booking/:bookingId"
          element={
            <Authentication>
              <EditBookingPage />
            </Authentication>
          }
        />
        <Route
          path="create-booking"
          element={
            <Authentication>
              <CreateBookingPage />
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
