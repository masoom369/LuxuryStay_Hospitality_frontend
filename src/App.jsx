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
  HotelDetailsPage,
  HotelListingPage,
} from "./pages";

// Pages (Admin)
import HotelManagement from "./pages/admin/HotelManagement";
import RoomsManagement from "./pages/admin/RoomsManagement";
import UserManagement from "./pages/admin/UserManagement";

// Pages (Guest)
import GuestDashboard from "./pages/guest/GuestDashboard";
import MyBookingsPage from "./pages/guest/MyBookingsPage";
import BookingHistoryManagement from "./pages/guest/BookingHistoryManagement";
import ServiceRequestsInterface from "./pages/guest/ServiceRequestsInterface";
import FeedbackSubmissionForm from "./pages/guest/FeedbackSubmissionForm";
import InRoomServices from "./pages/guest/InRoomServices";

// Pages (Manager)
import ReportingDashboard from "./pages/manager/ReportingDashboard";
import OccupancyReports from "./pages/manager/OccupancyReports";
import RevenueReports from "./pages/manager/RevenueReports";
import GuestFeedbackAnalytics from "./pages/manager/GuestFeedbackAnalytics";
import PerformanceMetricsDashboard from "./pages/manager/PerformanceMetricsDashboard";
import ExportReportsInterface from "./pages/manager/ExportReportsInterface";
import FeedbackManagement from "./pages/manager/FeedbackManagement";

// Pages (Receptionist)
import CreateGuestAccount from "./pages/receptionist/CreateGuestAccount";
import WalkInBooking from "./pages/receptionist/WalkInBooking";
import RoomAvailability from "./pages/receptionist/RoomAvailability";

// Pages (Housekeeping)
import HousekeepingTaskManagement from "./pages/housekeeping/HousekeepingTaskManagement";

// Pages (Maintenance)
import MaintenanceIssueManagement from "./pages/maintenance/MaintenanceIssueManagement";

// Pages (Shared)
import AccountPage from "./pages/shared/AccountPage";

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
            <Route path="/hotels" element={<HotelListingPage />} />
            <Route path="/hotels/:id" element={<HotelDetailsPage />} />
            <Route
              path="/roompackage/:id"
              element={<RoomPackageDetailPage />}
            />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/password-reset" element={<PasswordResetPage />} />
          </Route>

          {/* Dashboard Layout */}
          <Route element={<DashboardLayout />}>
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/hotels" element={<HotelManagement />} />
            <Route path="/admin/rooms" element={<RoomsManagement />} />
            <Route path="/admin/contact" element={<ManageContactUs />} />
            
            {/* Guest Routes */}
            <Route path="/guest/dashboard" element={<GuestDashboard />} />
            <Route path="/guest/my-bookings" element={<MyBookingsPage />} />
            <Route path="/guest/booking-history" element={<BookingHistoryManagement />} />
            <Route path="/guest/service-requests" element={<ServiceRequestsInterface />} />
            <Route path="/guest/feedback" element={<FeedbackSubmissionForm />} />
            <Route path="/guest/room-service" element={<InRoomServices />} />
            
            {/* Manager Routes */}
            <Route path="/manager/reporting" element={<ReportingDashboard />} />
            <Route path="/manager/occupancy" element={<OccupancyReports />} />
            <Route path="/manager/revenue" element={<RevenueReports />} />
            <Route path="/manager/feedback" element={<GuestFeedbackAnalytics />} />
            <Route path="/manager/performance" element={<PerformanceMetricsDashboard />} />
            <Route path="/manager/export" element={<ExportReportsInterface />} />
            <Route path="/manager/feedback-management" element={<FeedbackManagement />} />
            
            {/* Receptionist Routes */}
            <Route path="/receptionist/create-guest" element={<CreateGuestAccount />} />
            <Route path="/receptionist/walk-in" element={<WalkInBooking />} />
            <Route path="/receptionist/room-availability" element={<RoomAvailability />} />
            
            {/* Housekeeping Routes */}
            <Route path="/housekeeping/tasks" element={<HousekeepingTaskManagement />} />
            
            {/* Maintenance Routes */}
            <Route path="/maintenance/issues" element={<MaintenanceIssueManagement />} />
          </Route>

          {/* Shared Routes */}
          <Route path="/account" element={<AccountPage />} />
          
          {/* 404 Page */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
