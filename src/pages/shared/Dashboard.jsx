import { useAuth } from "../../context/AuthContext";
import AdminDashboard from "../admin/AdminDashboard";
import ManagerDashboard from "../manager/ManagerDashboard";
import ReceptionistDashboard from "../receptionist/ReceptionistDashboard";
import HousekeepingDashboard from "../housekeeping/HousekeepingDashboard";
import MaintenanceDashboard from "../maintenance/MaintenanceDashboard";
import GuestDashboard from "../guest/GuestDashboard";
import PerformanceMetricsDashboard from "../manager/PerformanceMetricsDashboard";

export default function Dashboard() {
  const { user } = useAuth();

  // Render different dashboard based on user role
  if (user?.role === 'admin') {
    return <AdminDashboard />;
  } else if (user?.role === 'manager') {
    return <PerformanceMetricsDashboard />;
  } else if (user?.role === 'receptionist') {
    return <ReceptionistDashboard />;
  } else if (user?.role === 'housekeeping') {
    return <HousekeepingDashboard />;
  } else if (user?.role === 'maintenance') {
    return <MaintenanceDashboard />;
  } else if (user?.role === 'guest') {
    return <GuestDashboard />;
  } else {
    // Default to guest dashboard for other roles or fallback
    return <GuestDashboard />;
  }
}
