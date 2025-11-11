import { createContext, useContext, useState, useCallback } from "react";
import api from "../services/api";

const DashboardContext = createContext(null);

export const DashboardProvider = ({ children }) => {
  // === STATE ===
  const [analytics, setAnalytics] = useState({});
  const [recentReservations, setRecentReservations] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    totalReservations: 0,
    totalRevenue: 0,
    occupancyRate: 0,
  });
  const [maintenanceTasks, setMaintenanceTasks] = useState([]);
  const [housekeepingTasks, setHousekeepingTasks] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [activeUsers, setActiveUsers] = useState(0);

  const [loading, setLoading] = useState({
    analytics: false,
    reservations: false,
    users: false,
    maintenance: false,
    housekeeping: false,
    stats: false,
  });

  // === UTILITY ===
  const handleError = (error, fallbackMsg) => {
    console.error(error);
    return error.response?.data?.message || fallbackMsg;
  };

  // =====================================================
  // 1️⃣ DASHBOARD ANALYTICS FUNCTIONS
  // =====================================================

  // Fetch dashboard analytics
  const fetchDashboardAnalytics = useCallback(async (timeRange = '7d') => {
    setLoading((prev) => ({ ...prev, analytics: true }));
    try {
      const response = await api.get("/analytics/dashboard", { params: { timeRange } });
      const data = response.data.data || {};
      setAnalytics(data);
      return data;
    } catch (error) {
      throw new Error(handleError(error, "Failed to fetch dashboard analytics"));
    } finally {
      setLoading((prev) => ({ ...prev, analytics: false }));
    }
  }, []);

  // Fetch dashboard stats
  const fetchDashboardStats = useCallback(async () => {
    setLoading((prev) => ({ ...prev, stats: true }));
    try {
      const response = await api.get("/analytics/stats");
      const data = response.data.data || {};
      setDashboardStats(data);
      return data;
    } catch (error) {
      throw new Error(handleError(error, "Failed to fetch dashboard stats"));
    } finally {
      setLoading((prev) => ({ ...prev, stats: false }));
    }
  }, []);

  // =====================================================
  // 2️⃣ RESERVATIONS FUNCTIONS
  // =====================================================

  // Fetch recent reservations
  const fetchRecentReservations = useCallback(async (limit = 10) => {
    setLoading((prev) => ({ ...prev, reservations: true }));
    try {
      const response = await api.get("/reservations/recent", { params: { limit } });
      const data = response.data.data || [];
      setRecentReservations(data);
      return data;
    } catch (error) {
      throw new Error(handleError(error, "Failed to fetch recent reservations"));
    } finally {
      setLoading((prev) => ({ ...prev, reservations: false }));
    }
  }, []);

  // Fetch reservations by date range
  const fetchReservationsByDate = useCallback(async (startDate, endDate) => {
    try {
      const response = await api.get("/reservations", { 
        params: { 
          startDate: new Date(startDate).toISOString(),
          endDate: new Date(endDate).toISOString()
        } 
      });
      return response.data.data || [];
    } catch (error) {
      throw new Error(handleError(error, "Failed to fetch reservations by date"));
    }
  }, []);

  // =====================================================
  // 3️⃣ USERS FUNCTIONS
  // =====================================================

  // Fetch recent users
  const fetchRecentUsers = useCallback(async (limit = 10) => {
    setLoading((prev) => ({ ...prev, users: true }));
    try {
      const response = await api.get("/users/recent", { params: { limit } });
      const data = response.data.data || [];
      setRecentUsers(data);
      return data;
    } catch (error) {
      throw new Error(handleError(error, "Failed to fetch recent users"));
    } finally {
      setLoading((prev) => ({ ...prev, users: false }));
    }
  }, []);

  // Fetch users by role
  const fetchUsersByRole = useCallback(async (role) => {
    try {
      const response = await api.get("/users", { params: { role } });
      return response.data.data || [];
    } catch (error) {
      throw new Error(handleError(error, "Failed to fetch users by role"));
    }
  }, []);

  // =====================================================
  // 4️⃣ MAINTENANCE FUNCTIONS
  // =====================================================

  // Fetch maintenance tasks
  const fetchMaintenanceTasks = useCallback(async (status = null) => {
    setLoading((prev) => ({ ...prev, maintenance: true }));
    try {
      const response = await api.get("/maintenance", { params: { status } });
      const data = response.data.data || [];
      setMaintenanceTasks(data);
      return data;
    } catch (error) {
      throw new Error(handleError(error, "Failed to fetch maintenance tasks"));
    } finally {
      setLoading((prev) => ({ ...prev, maintenance: false }));
    }
  }, []);

  // Update maintenance task status
  const updateMaintenanceTaskStatus = useCallback(async (taskId, status) => {
    try {
      const response = await api.patch(`/maintenance/${taskId}/status`, { status });
      // Update the local state
      setMaintenanceTasks(prev => 
        prev.map(task => 
          task._id === taskId ? { ...task, status } : task
        )
      );
      return response.data;
    } catch (error) {
      throw new Error(handleError(error, "Failed to update maintenance task status"));
    }
  }, []);

  // =====================================================
  // 5️⃣ HOUSEKEEPING FUNCTIONS
  // =====================================================

  // Fetch housekeeping tasks
  const fetchHousekeepingTasks = useCallback(async (status = null) => {
    setLoading((prev) => ({ ...prev, housekeeping: true }));
    try {
      const response = await api.get("/housekeeping", { params: { status } });
      const data = response.data.data || [];
      setHousekeepingTasks(data);
      return data;
    } catch (error) {
      throw new Error(handleError(error, "Failed to fetch housekeeping tasks"));
    } finally {
      setLoading((prev) => ({ ...prev, housekeeping: false }));
    }
  }, []);

  // Update housekeeping task status
  const updateHousekeepingTaskStatus = useCallback(async (taskId, status) => {
    try {
      const response = await api.patch(`/housekeeping/${taskId}/status`, { status });
      // Update the local state
      setHousekeepingTasks(prev => 
        prev.map(task => 
          task._id === taskId ? { ...task, status } : task
        )
      );
      return response.data;
    } catch (error) {
      throw new Error(handleError(error, "Failed to update housekeeping task status"));
    }
  }, []);

  // =====================================================
  // 6️⃣ NOTIFICATIONS FUNCTIONS
  // =====================================================

  // Fetch notifications
  const fetchNotifications = useCallback(async (limit = 10) => {
    try {
      const response = await api.get("/notifications", { params: { limit } });
      const data = response.data.data || [];
      setNotifications(data);
      return data;
    } catch (error) {
      throw new Error(handleError(error, "Failed to fetch notifications"));
    }
  }, []);

  // Mark notification as read
  const markNotificationAsRead = useCallback(async (notificationId) => {
    try {
      const response = await api.patch(`/notifications/${notificationId}/read`);
      setNotifications(prev => 
        prev.map(notification => 
          notification._id === notificationId 
            ? { ...notification, isRead: true } 
            : notification
        )
      );
      return response.data;
    } catch (error) {
      throw new Error(handleError(error, "Failed to mark notification as read"));
    }
  }, []);

  // =====================================================
  // 7️⃣ REAL-TIME DASHBOARD UTILITIES
  // =====================================================

  // Simulate fetching active users count (would typically come from WebSocket or periodic API call)
  const fetchActiveUsers = useCallback(async () => {
    try {
      // This would typically come from WebSocket or a real-time endpoint
      // For now, we'll simulate with a basic API call
      const response = await api.get("/users/active");
      const count = response.data.count || 0;
      setActiveUsers(count);
      return count;
    } catch (error) {
      console.warn("Could not fetch active users count");
      return 0;
    }
  }, []);

  // =====================================================
  // CONTEXT VALUE
  // =====================================================
  const contextValue = {
    // Data
    analytics,
    recentReservations,
    recentUsers,
    dashboardStats,
    maintenanceTasks,
    housekeepingTasks,
    notifications,
    activeUsers,

    // Loading
    loading,

    // Analytics methods
    fetchDashboardAnalytics,
    fetchDashboardStats,

    // Reservations methods
    fetchRecentReservations,
    fetchReservationsByDate,

    // Users methods
    fetchRecentUsers,
    fetchUsersByRole,

    // Maintenance methods
    fetchMaintenanceTasks,
    updateMaintenanceTaskStatus,

    // Housekeeping methods
    fetchHousekeepingTasks,
    updateHousekeepingTaskStatus,

    // Notifications methods
    fetchNotifications,
    markNotificationAsRead,

    // Real-time methods
    fetchActiveUsers,
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
};

// === HOOK EXPORT ===
export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      "useDashboardContext must be used within a DashboardProvider"
    );
  }
  return context;
};