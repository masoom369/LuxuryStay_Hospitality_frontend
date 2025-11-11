import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PageNotFound } from "./components";
import ProtectedRoute from "./context/ProtectedRoute";

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
  RoomDetailPage,
} from "./pages";

// Pages (Admin)
import HotelManagement from "./pages/admin/HotelManagement";
import RoomsManagement from "./pages/admin/RoomsManagement";
import UserManagement from "./pages/admin/UserManagement";
import ManageContactUs from "./pages/admin/ManageContactUs";

// Pages (Guest)
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
            <Route path="/rooms/:id" element={<RoomDetailPage />} />
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
            <Route path="/dashboard" element={
               <ProtectedRoute allowedRoles={['admin', 'manager', 'receptionist', 'housekeeping', 'maintenance', 'guest']}>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <UserManagement />
              </ProtectedRoute>
            } />
            <Route path="/admin/hotels" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <HotelManagement />
              </ProtectedRoute>
            } />
            <Route path="/admin/rooms" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <RoomsManagement />
              </ProtectedRoute>
            } />
            <Route path="/admin/contact" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <ManageContactUs />
              </ProtectedRoute>
            } />

            {/* Guest Routes */}
            <Route path="/guest/my-bookings" element={
              <ProtectedRoute allowedRoles={['guest']}>
                <MyBookingsPage />
              </ProtectedRoute>
            } />
            <Route path="/guest/booking-history" element={
              <ProtectedRoute allowedRoles={['guest']}>
                <BookingHistoryManagement />
              </ProtectedRoute>
            } />
            <Route path="/guest/service-requests" element={
              <ProtectedRoute allowedRoles={['guest']}>
                <ServiceRequestsInterface />
              </ProtectedRoute>
            } />
            <Route path="/guest/feedback" element={
              <ProtectedRoute allowedRoles={['guest']}>
                <FeedbackSubmissionForm />
              </ProtectedRoute>
            } />
            <Route path="/guest/room-service" element={
              <ProtectedRoute allowedRoles={['guest']}>
                <InRoomServices />
              </ProtectedRoute>
            } />

            {/* Manager Routes */}
            <Route path="/manager/reporting" element={
              <ProtectedRoute allowedRoles={['manager']}>
                <ReportingDashboard />
              </ProtectedRoute>
            } />
            <Route path="/manager/occupancy" element={
              <ProtectedRoute allowedRoles={['manager']}>
                <OccupancyReports />
              </ProtectedRoute>
            } />
            <Route path="/manager/revenue" element={
              <ProtectedRoute allowedRoles={['manager']}>
                <RevenueReports />
              </ProtectedRoute>
            } />
            <Route path="/manager/feedback" element={
              <ProtectedRoute allowedRoles={['manager']}>
                <GuestFeedbackAnalytics />
              </ProtectedRoute>
            } />
            <Route path="/manager/performance" element={
              <ProtectedRoute allowedRoles={['manager']}>
                <PerformanceMetricsDashboard />
              </ProtectedRoute>
            } />
            <Route path="/manager/export" element={
              <ProtectedRoute allowedRoles={['manager']}>
                <ExportReportsInterface />
              </ProtectedRoute>
            } />
            <Route path="/manager/feedback-management" element={
              <ProtectedRoute allowedRoles={['manager']}>
                <FeedbackManagement />
              </ProtectedRoute>
            } />

            {/* Receptionist Routes */}
            <Route path="/receptionist/create-guest" element={
              <ProtectedRoute allowedRoles={['receptionist']}>
                <CreateGuestAccount />
              </ProtectedRoute>
            } />
            <Route path="/receptionist/walk-in" element={
              <ProtectedRoute allowedRoles={['receptionist']}>
                <WalkInBooking />
              </ProtectedRoute>
            } />
            <Route path="/receptionist/room-availability" element={
              <ProtectedRoute allowedRoles={['receptionist']}>
                <RoomAvailability />
              </ProtectedRoute>
            } />

            {/* Housekeeping Routes */}
            <Route path="/housekeeping/tasks" element={
              <ProtectedRoute allowedRoles={['housekeeping']}>
                <HousekeepingTaskManagement />
              </ProtectedRoute>
            } />

            {/* Maintenance Routes */}
            <Route path="/maintenance/issues" element={
              <ProtectedRoute allowedRoles={['maintenance']}>
                <MaintenanceIssueManagement />
              </ProtectedRoute>
            } />

            {/* Shared Routes */}
            <Route path="/account" element={
              <ProtectedRoute allowedRoles={['admin', 'manager', 'receptionist', 'housekeeping', 'maintenance', 'guest']}>
                <AccountPage />
              </ProtectedRoute>
            } />
          </Route>

          {/* 404 Page */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
