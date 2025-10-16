import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Import pages (empty placeholders)
import HomePage from './pages/public/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/shared/DashboardPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManagerDashboard from './pages/staff/manager/ManagerDashboard';
import ReceptionistDashboard from './pages/staff/receptionist/ReceptionistDashboard';
import HousekeepingDashboard from './pages/staff/housekeeping/HousekeepingDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/manager/dashboard" element={<ManagerDashboard />} />
          <Route path="/receptionist/dashboard" element={<ReceptionistDashboard />} />
          <Route path="/housekeeping/dashboard" element={<HousekeepingDashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
