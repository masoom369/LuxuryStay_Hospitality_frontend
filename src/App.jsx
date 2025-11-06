import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PageNotFound } from "./components";

// Pages (Public)
import {
  HomePage,
  Dashboard,
  LoginPage,
  RegisterPage,
  PasswordResetPage,
  AboutUsPage,
  ContactUsPage,
  FAQPage,
  PrivacyPolicyPage,
  RoomPackageDetailPage,
} from "./pages";

// Pages (Admin)
import HotelManagement from "./pages/admin/HotelManagement";
import RoomsManagement from "./pages/admin/RoomsManagement";
import UserManagement from "./pages/admin/UserManagement";

// Layouts
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";

const App = () => {
  return (
    <main className="">
      <BrowserRouter>
        <Routes>
          {/* Public Layout */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/roompackage/:id" element={<RoomPackageDetailPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/password-reset" element={<PasswordResetPage />} />
          </Route>

          {/* Dashboard Layout */}
          <Route path="/admin" element={<DashboardLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
             <Route path="users" element={<UserManagement />} />
            <Route path="hotels" element={<HotelManagement />} />
            <Route path="rooms" element={<RoomsManagement />} />
          </Route>

          {/* 404 Page */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
