import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  Outlet,
} from "react-router-dom";
import { Footer, Header, PageNotFound } from "./components";
import {
  HomePage,
  RoomDetails,
  AboutUsPage,
  ContactUsPage,
  FAQPage,
  PrivacyPolicyPage,
  UserManagementInterface,
  DashboardPage,
  AdminDashboard,
  HotelManagementInterface,
} from "./pages";
import { LoginPage, RegisterPage, PasswordResetPage } from "./pages";
import { AuthProvider, ProtectedRoute } from "./context";
import Layout from "./layout/Layout";
import { HelmetProvider } from "react-helmet-async";

// ✅ Import CSS globally by default (no delay)
import "./style/index.css";

// Wrapper component for dashboard routes with Layout
const DashboardLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

// Component to conditionally render Header and Footer
const ConditionalLayout = ({ children }) => {
  const location = useLocation();

  // Define paths that should use the dashboard layout (without header/footer)
  const dashboardPaths = ["/dash", "/user-management", "/hotel-management"];

  // Check if current path is a dashboard path
  const isDashboardRoute = dashboardPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  // If it's a dashboard route, don't render Header and Footer
  if (isDashboardRoute) {
    return <>{children}</>;
  }

  // Otherwise, render with Header and Footer
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <ConditionalLayout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/FAQ" element={<FAQPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/room/:id" element={<RoomDetails />} />
              <Route path="/about-us" element={<AboutUsPage />} />
              <Route path="/contact-us" element={<ContactUsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/password-reset" element={<PasswordResetPage />} />

              {/* Dashboard Routes - All nested routes automatically get Layout */}
              <Route element={<DashboardLayout />}>
                <Route
                  path="/dash"
                  element={
                    <ProtectedRoute >
                      <DashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute requiredRoles={['admin']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/user-management"
                  element={
                    <ProtectedRoute requiredRoles={['admin']}>
                      <UserManagementInterface />
                    </ProtectedRoute>
                  }
                />
                <Route path="/hotel-management" element={
                  <ProtectedRoute requiredRoles={['admin']}>
                    <HotelManagementInterface />
                  </ProtectedRoute>
                } />
                {/* Add more dashboard routes here */}
              </Route>

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </ConditionalLayout>
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
};

export default App;
