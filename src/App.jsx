import AdminAccount from "./pages/admin/AdminAccount";
import ManagerAccount from "./pages/manager/ManagerAccount";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PageNotFound } from "./components";

// Pages (Public)
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

// Pages (Admin)
import HotelManagement from "./pages/admin/HotelManagement";
import RoomsManagement from "./pages/admin/RoomsManagement";
import UserManagement from "./pages/admin/UserManagement";

// Pages (Manager)
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import BookingManagement from "./pages/manager/BookingManagement";
import StaffManagement from "./pages/manager/StaffManagement";
import Report from "./pages/manager/Reports";   

// Layouts
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import ManagerLayout from "./layouts/ManagerLayout";


const App = () => {
  return (
    <main className="">
      <BrowserRouter>
        <Routes>

          {/* Public Layout */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/room/:id" element={<RoomDetails />} />
            <Route path="/room-details/:id" element={<RoomDetailsPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/password-reset" element={<PasswordResetPage />} />
          </Route>

          {/* Admin Layout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="hotels" element={<HotelManagement />} />
            <Route path="rooms" element={<RoomsManagement />} />
            <Route path="account" element={<AdminAccount />} />
          </Route>

          {/* Manager Layout */}
           <Route path="/manager" element={<ManagerLayout />}>
            <Route index element={<ManagerDashboard />} />
            <Route path="/manager/bookings" element={<BookingManagement />} />
            <Route path="/manager/staff" element={<StaffManagement />} />
            <Route path="/manager/reports" element={<Report />} />
            <Route path="/manager/profile" element={<ManagerAccount />} />
        </Route>

          {/* 404 Page */}
          <Route path="*" element={<PageNotFound />} />

        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
