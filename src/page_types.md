# Static and Dynamic Pages in LuxuryStay Hospitality Frontend

## Static Pages
Static pages are those that display mostly fixed content with minimal or no interaction, and typically do not fetch data from APIs or use complex state management.

### Public Pages
- AboutUsPage.jsx
- ContactUsPage.jsx
- FAQPage.jsx
- PrivacyPolicyPage.jsx
- GalleryPage.jsx
- ServicesCatalogPage.jsx
- HomePage.jsx (Note: While it has some dynamic elements, the content structure is largely static)

### Auth Pages
- None of the auth pages are fully static as they require form interactions

### Admin Pages
- None of the admin pages are static as they require data management

### Guest Pages
- None of the guest pages are static as they involve user interactions

### Other Pages
- Most pages in the other categories (housekeeping, maintenance, manager, receptionist, shared) require data fetching or management

## Dynamic Pages
Dynamic pages are those that fetch data from APIs, handle user interactions, manage state, or require real-time updates.

### Public Pages
- HotelListingPage.jsx (fetches hotel data from API)
- HotelDetailsPage.jsx (fetches specific hotel details)
- OnlineBookingForm.jsx (form with API integration)
- RoomDetailPage.jsx (fetches room data from API with booking functionality)
- RoomPackageDetailPage.jsx (static package data)

### Auth Pages
- LoginPage.jsx (form handling)
- PasswordResetPage.jsx (form handling)
- RegisterPage.jsx (form handling)

### Admin Pages
- AdminDashboard.jsx (data management)
- HotelManagement.jsx (data management)
- ManageContactUs.jsx (data management)
- RoomsManagement.jsx (data management)
- UserManagement.jsx (data management)

### Guest Pages
- BookingHistoryManagement.jsx (fetches user booking data)
- FeedbackSubmissionForm.jsx (form handling)
- GuestDashboard.jsx (displays user-specific data)
- InRoomServices.jsx (user interactions)
- MyBookingsPage.jsx (fetches user bookings)
- ServiceRequestsInterface.jsx (form handling)

### Housekeeping Pages
- HousekeepingDashboard.jsx (fetches tasks)
- HousekeepingTaskManagement.jsx (task management)

### Maintenance Pages
- MaintenanceDashboard.jsx (fetches issues)
- MaintenanceIssueManagement.jsx (issue management)

### Manager Pages
- ExportReportsInterface.jsx (data export)
- FeedbackManagement.jsx (feedback management)
- GuestFeedbackAnalytics.jsx (analytics data)
- ManagerDashboard.jsx (dashboard data)
- OccupancyReports.jsx (report data)
- PerformanceMetricsDashboard.jsx (metrics data)
- ReportingDashboard.jsx (report data)
- RevenueReports.jsx (financial data)

### Receptionist Pages
- CreateGuestAccount.jsx (form handling)
- ReceptionistDashboard.jsx (dashboard data)
- RoomAvailability.jsx (availability data)
- WalkInBooking.jsx (booking form)

### Shared Pages
- AccountPage.jsx (user account data)
- Dashboard.jsx (admin dashboard data)

## Summary
- **Static Pages:** 8 pages (mostly informational content)
- **Dynamic Pages:** 26+ pages (require data fetching, state management, or user interactions)
- The application is predominantly dynamic, which is typical for a hospitality management system that requires real-time data management.