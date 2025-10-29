import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PageNotFound } from "./components";
import {
  HomePage,
  RoomDetails,
  Dashboard,
  LoginPage,
  RegisterPage,
  PasswordResetPage,
  AboutUsPage,
  ContactUsPage,
  FAQPage,
  PrivacyPolicyPage,
  RoomDetailsPage,
} from "./pages";
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";

const App = () => {
  return (
    <main className="">
      <BrowserRouter>
        <PublicLayout>
          <Routes>
            {/* Public Routes */}
            <Route path={"/"} element={<HomePage />} />
            <Route path={"/room/:id"} element={<RoomDetails />} />
            <Route path={"/about-us"} element={<AboutUsPage />} />
            <Route path={"/contact-us"} element={<ContactUsPage />} />
            <Route path={"/faq"} element={<FAQPage />} />
            <Route path={"/privacy-policy"} element={<PrivacyPolicyPage />} />
            <Route path={"/room-details/:id"} element={<RoomDetailsPage />} />

            {/* Auth Routes */}
            <Route path={"/login"} element={<LoginPage />} />
            <Route path={"/register"} element={<RegisterPage />} />
            <Route path={"/password-reset"} element={<PasswordResetPage />} />

            {/* Dashboard Routes */}
            <Route path={"/admin/dashboard"} element={<Dashboard />} />

            {/* 404 */}
            <Route path={"*"} element={<PageNotFound />} />
          </Routes>
        </PublicLayout>
      </BrowserRouter>
    </main>
  );
};

export default App;
