import { BrowserRouter, Route, Routes, useLocation, Outlet } from 'react-router-dom';
import { Footer, Header, PageNotFound } from './components';
import { HomePage, RoomDetails, AboutUsPage, ContactUsPage, FAQPage, PrivacyPolicyPage, UserManagementInterface, DashboardPage } from './pages';
import { LoginPage, RegisterPage, PasswordResetPage } from './pages';
import { AuthProvider } from './context/AuthContext';
import Layout from './layout/Layout';
import { HelmetProvider } from 'react-helmet-async';

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
  const dashboardPaths = ['/dashboard', '/admin'];
  
  // Check if current path is a dashboard path
  const isDashboardRoute = dashboardPaths.some(path => 
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
              <Route path={'/'} element={<HomePage />} />
              <Route path={'/FAQ'} element={<FAQPage />} />
              <Route path={'/privacy-policy'} element={<PrivacyPolicyPage />} />
              <Route path={'/room/:id'} element={<RoomDetails />} />
              <Route path={'/about-us'} element={<AboutUsPage />} />
              <Route path={'/contact-us'} element={<ContactUsPage />} />
              <Route path={'/login'} element={<LoginPage />} />
              <Route path={'/register'} element={<RegisterPage />} />
              <Route path={'/password-reset'} element={<PasswordResetPage />} />
              
              {/* Dashboard Routes - All nested routes automatically get Layout */}
              <Route element={<DashboardLayout />}>
                <Route path={'/dashboard'}  element={<DashboardPage />} />
                {/* Add more dashboard routes here without wrapping in Layout */}
              </Route>
              
              {/* Admin Routes - All nested routes automatically get Layout */}
              <Route  element={<DashboardLayout />}>
                <Route path={'/admin/user-management'} element={<UserManagementInterface />} />
                {/* Add more admin routes here without wrapping in Layout */}
              </Route>
              
              <Route path={'*'} element={<PageNotFound />} />
            </Routes>
          </ConditionalLayout>
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
};

export default App;