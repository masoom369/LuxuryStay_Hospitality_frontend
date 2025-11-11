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
  const fetchDashboardAnalytics = useCallback(async (timeRange = "7d") => {
    setLoading((prev) => ({ ...prev, analytics: true }));
    try {
      const response = await api.get("/analytics/dashboard", {
        params: { timeRange },
      });
      const data = response.data.data || {};
      setAnalytics(data);
      return data;
    } catch (error) {
      throw new Error(
        handleError(error, "Failed to fetch dashboard analytics")
      );
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
      const response = await api.get("/reservations/recent", {
        params: { limit },
      });
      const data = response.data.data || [];
      setRecentReservations(data);
      return data;
    } catch (error) {
      throw new Error(
        handleError(error, "Failed to fetch recent reservations")
      );
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
          endDate: new Date(endDate).toISOString(),
        },
      });
      return response.data.data || [];
    } catch (error) {
      throw new Error(
        handleError(error, "Failed to fetch reservations by date")
      );
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
      const response = await api.patch(`/maintenance/${taskId}/status`, {
        status,
      });
      // Update the local state
      setMaintenanceTasks((prev) =>
        prev.map((task) => (task._id === taskId ? { ...task, status } : task))
      );
      return response.data;
    } catch (error) {
      throw new Error(
        handleError(error, "Failed to update maintenance task status")
      );
    }
  }, []);

  // Fetch maintenance stats
  const fetchMaintenanceStats = useCallback(async () => {
    try {
      const response = await api.get("/maintenance/stats");
      return response.data.data || {};
    } catch (error) {
      throw new Error(handleError(error, "Failed to fetch maintenance stats"));
    }
  }, []);

  // Fetch maintenance issues
  const fetchMaintenanceIssues = useCallback(async (status = null) => {
    try {
      const params = status ? { status } : {};
      const response = await api.get("/maintenance", { params });
      return response.data.data || [];
    } catch (error) {
      throw new Error(handleError(error, "Failed to fetch maintenance issues"));
    }
  }, []);

  // Fetch maintenance schedule
  const fetchMaintenanceSchedule = useCallback(async () => {
    try {
      const response = await api.get("/maintenance/schedule");
      return response.data.data || [];
    } catch (error) {
      throw new Error(
        handleError(error, "Failed to fetch maintenance schedule")
      );
    }
  }, []);

  // Fetch maintenance trends
  const fetchMaintenanceTrends = useCallback(async () => {
    try {
      const response = await api.get("/maintenance/trends");
      return response.data.data || [];
    } catch (error) {
      throw new Error(handleError(error, "Failed to fetch maintenance trends"));
    }
  }, []);

  // Update maintenance issue status
  const updateMaintenanceIssueStatus = useCallback(async (issueId, status) => {
    try {
      const response = await api.patch(`/maintenance/${issueId}/status`, {
        status,
      });
      return response.data.data;
    } catch (error) {
      throw new Error(
        handleError(error, "Failed to update maintenance issue status")
      );
    }
  }, []);

  // Filter maintenance issues
  const filterMaintenanceIssues = useCallback(async (filters) => {
    try {
      const response = await api.get("/maintenance", { params: filters });
      return response.data.data || [];
    } catch (error) {
      throw new Error(
        handleError(error, "Failed to filter maintenance issues")
      );
    }
  }, []);

  // Search maintenance issues
  const searchMaintenanceIssues = useCallback(async (query) => {
    try {
      const response = await api.get("/maintenance/search", {
        params: { q: query },
      });
      return response.data.data || [];
    } catch (error) {
      throw new Error(
        handleError(error, "Failed to search maintenance issues")
      );
    }
  }, []);

  // Get maintenance issue by ID
  const getMaintenanceIssueById = useCallback(async (issueId) => {
    try {
      const response = await api.get(`/maintenance/${issueId}`);
      return response.data.data;
    } catch (error) {
      throw new Error(handleError(error, "Failed to fetch maintenance issue"));
    }
  }, []);

  // Assign maintenance issue to a technician
  const assignMaintenanceIssue = useCallback(async (issueId, technicianId) => {
    try {
      const response = await api.patch(`/maintenance/${issueId}/assign`, {
        assignedTo: technicianId,
      });
      return response.data.data;
    } catch (error) {
      throw new Error(handleError(error, "Failed to assign maintenance issue"));
    }
  }, []);

  // Create a new maintenance issue report
  const createMaintenanceIssue = useCallback(async (issueData) => {
    try {
      const response = await api.post("/maintenance", issueData);
      return response.data.data;
    } catch (error) {
      throw new Error(handleError(error, "Failed to create maintenance issue"));
    }
  }, []);

  // =====================================================
  // 5️⃣ HOUSEKEEPING FUNCTIONS
  // =====================================================

  // Fetch housekeeping stats
  const fetchHousekeepingStats = useCallback(async () => {
    try {
      const response = await api.get("/housekeeping/stats");
      return response.data.data || {};
    } catch (error) {
      throw new Error(handleError(error, "Failed to fetch housekeeping stats"));
    }
  }, []);

  // Fetch housekeeping tasks
  const fetchHousekeepingTasks = useCallback(async (status = null) => {
    try {
      const params = status ? { status } : {};
      const response = await api.get("/housekeeping", { params });
      return response.data.data || [];
    } catch (error) {
      throw new Error(handleError(error, "Failed to fetch housekeeping tasks"));
    }
  }, []);

  // Fetch housekeeping schedule
  const fetchHousekeepingSchedule = useCallback(async () => {
    try {
      const response = await api.get("/housekeeping/schedule");
      return response.data.data || [];
    } catch (error) {
      throw new Error(
        handleError(error, "Failed to fetch housekeeping schedule")
      );
    }
  }, []);

  // Update housekeeping task status
  const updateHousekeepingTaskStatus = useCallback(async (taskId, status) => {
    try {
      const response = await api.patch(`/housekeeping/${taskId}/status`, {
        status,
      });
      return response.data.data;
    } catch (error) {
      throw new Error(
        handleError(error, "Failed to update housekeeping task status")
      );
    }
  }, []);

  // Filter housekeeping tasks
  const filterHousekeepingTasks = useCallback(async (filters) => {
    try {
      const response = await api.get("/housekeeping", { params: filters });
      return response.data.data || [];
    } catch (error) {
      throw new Error(
        handleError(error, "Failed to filter housekeeping tasks")
      );
    }
  }, []);

  // Search housekeeping tasks
  const searchHousekeepingTasks = useCallback(async (query) => {
    try {
      const response = await api.get("/housekeeping/search", {
        params: { q: query },
      });
      return response.data.data || [];
    } catch (error) {
      throw new Error(
        handleError(error, "Failed to search housekeeping tasks")
      );
    }
  }, []);

  // Get housekeeping task by ID
  const getHousekeepingTaskById = useCallback(async (taskId) => {
    try {
      const response = await api.get(`/housekeeping/${taskId}`);
      return response.data.data;
    } catch (error) {
      throw new Error(handleError(error, "Failed to fetch housekeeping task"));
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
      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      );
      return response.data;
    } catch (error) {
      throw new Error(
        handleError(error, "Failed to mark notification as read")
      );
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
  // 8️⃣ GUEST FUNCTIONS
  // =====================================================

  // Fetch bookings for the logged-in guest
  const fetchGuestBookings = useCallback(async (status = null) => {
    try {
      const params = status ? { status } : {};
      const response = await api.get("/reservations/guest", { params });
      return response.data.data || [];
    } catch (error) {
      throw new Error(handleError(error, "Failed to fetch guest bookings"));
    }
  }, []);

  // Fetch booking history for the guest
  const fetchBookingHistory = useCallback(async () => {
    try {
      const response = await api.get("/reservations/history");
      return response.data.data || [];
    } catch (error) {
      throw new Error(handleError(error, "Failed to fetch booking history"));
    }
  }, []);

  // Cancel a specific booking
  const cancelBooking = useCallback(async (bookingId) => {
    try {
      const response = await api.patch(`/reservations/${bookingId}/cancel`);
      return response.data;
    } catch (error) {
      throw new Error(handleError(error, "Failed to cancel booking"));
    }
  }, []);

  // Initiate check-in for a booking
  const checkInBooking = useCallback(async (bookingId) => {
    try {
      const response = await api.patch(`/reservations/${bookingId}/checkin`);
      return response.data;
    } catch (error) {
      throw new Error(handleError(error, "Failed to initiate check-in"));
    }
  }, []);

  // Fetch service requests made by the guest
  const fetchGuestServiceRequests = useCallback(async () => {
    try {
      const response = await api.get("/services/guest");
      return response.data.data || [];
    } catch (error) {
      throw new Error(handleError(error, "Failed to fetch service requests"));
    }
  }, []);

  // Submit a new service request
  const submitServiceRequest = useCallback(async (requestData) => {
    try {
      const response = await api.post("/service-requests", requestData);
      return response.data;
    } catch (error) {
      throw new Error(handleError(error, "Failed to submit service request"));
    }
  }, []);

  // Cancel a service request
  const cancelServiceRequest = useCallback(async (requestId) => {
    try {
      const response = await api.delete(`/service-requests/${requestId}`);
      return response.data;
    } catch (error) {
      throw new Error(handleError(error, "Failed to cancel service request"));
    }
  }, []);

  // Track the status of a specific request
  const trackServiceRequest = useCallback(async (requestId) => {
    try {
      const response = await api.get(`/service-requests/${requestId}`);
      return response.data.data;
    } catch (error) {
      throw new Error(handleError(error, "Failed to track service request"));
    }
  }, []);

  // Submit feedback for a completed booking
  const submitFeedback = useCallback(async (feedbackData) => {
    try {
      const response = await api.post("/feedback", feedbackData);
      return response.data;
    } catch (error) {
      throw new Error(handleError(error, "Failed to submit feedback"));
    }
  }, []);

  // Fetch recent feedback submitted by the guest
  const fetchRecentFeedback = useCallback(async () => {
    try {
      const response = await api.get("/feedback/recent");
      return response.data.data || [];
    } catch (error) {
      throw new Error(handleError(error, "Failed to fetch recent feedback"));
    }
  }, []);

  // Fetch available room service items
  const fetchRoomServiceMenu = useCallback(async () => {
    try {
      const response = await api.get("/room-service/menu");
      return response.data.data || [];
    } catch (error) {
      throw new Error(handleError(error, "Failed to fetch room service menu"));
    }
  }, []);

  // Fetch additional services
  const fetchAdditionalServices = useCallback(async () => {
    try {
      const response = await api.get("/services/additional");
      return response.data.data || [];
    } catch (error) {
      throw new Error(
        handleError(error, "Failed to fetch additional services")
      );
    }
  }, []);

  // Place an order for room service
  const placeRoomServiceOrder = useCallback(async (orderData) => {
    try {
      const response = await api.post("/room-service/order", orderData);
      return response.data;
    } catch (error) {
      throw new Error(handleError(error, "Failed to place room service order"));
    }
  }, []);

  // Place a request for additional services
  const placeServiceRequest = useCallback(async (serviceData) => {
    try {
      const response = await api.post("/services/request", serviceData);
      return response.data;
    } catch (error) {
      throw new Error(handleError(error, "Failed to place service request"));
    }
  }, []);

  // Fetch guest-specific statistics like loyalty points
  const fetchGuestStats = useCallback(async () => {
    try {
      const response = await api.get("/users/guest/stats");
      return response.data.data || {};
    } catch (error) {
      throw new Error(handleError(error, "Failed to fetch guest stats"));
    }
  }, []);

  // Update guest preferences
  const updateGuestPreferences = useCallback(async (preferences) => {
    try {
      const response = await api.put("/users/guest/preferences", preferences);
      return response.data;
    } catch (error) {
      throw new Error(handleError(error, "Failed to update guest preferences"));
    }
  }, []);

  // =====================================================
  // 9️⃣ MANAGER SPECIFIC FUNCTIONS
  // =====================================================

  // Performance metrics functions
  const fetchPerformanceMetrics = useCallback(
    async (timeRange = "month", metricType = "all") => {
      try {
        const response = await api.get("/analytics/performance", {
          params: { timeRange, metricType },
        });
        return response.data.data || {};
      } catch (error) {
        throw new Error(
          handleError(error, "Failed to fetch performance metrics")
        );
      }
    },
    []
  );

  // Occupancy reports functions
  const fetchOccupancyReports = useCallback(
    async (timeRange = "month", roomType = "all") => {
      try {
        const response = await api.get("/analytics/occupancy", {
          params: { timeRange, roomType },
        });
        return response.data.data || {};
      } catch (error) {
        throw new Error(
          handleError(error, "Failed to fetch occupancy reports")
        );
      }
    },
    []
  );

  // Revenue reports functions
  const fetchRevenueReports = useCallback(
    async (timeRange = "month", filter = "all") => {
      try {
        const response = await api.get("/analytics/revenue", {
          params: { timeRange, filter },
        });
        return response.data.data || {};
      } catch (error) {
        throw new Error(handleError(error, "Failed to fetch revenue reports"));
      }
    },
    []
  );

  // Feedback management functions
  const fetchFeedbacks = useCallback(
    async (
      status = "all",
      rating = "all",
      sortBy = "newest",
      searchTerm = ""
    ) => {
      try {
        const response = await api.get("/feedback", {
          params: { status, rating, sortBy, searchTerm },
        });
        return response.data.data || [];
      } catch (error) {
        throw new Error(handleError(error, "Failed to fetch feedbacks"));
      }
    },
    []
  );

  const updateFeedbackStatus = useCallback(async (feedbackId, status) => {
    try {
      const response = await api.put(`/feedback/${feedbackId}/status`, {
        status,
      });
      return response.data;
    } catch (error) {
      throw new Error(handleError(error, "Failed to update feedback status"));
    }
  }, []);

  const respondToFeedback = useCallback(async (feedbackId, responseText) => {
    try {
      const response = await api.put(`/feedback/${feedbackId}/response`, {
        response: responseText,
      });
      return response.data;
    } catch (error) {
      throw new Error(handleError(error, "Failed to respond to feedback"));
    }
  }, []);

  // Guest feedback analytics functions
  const fetchFeedbackAnalytics = useCallback(
    async (timeRange = "month", filter = "all") => {
      try {
        const response = await api.get("/analytics/feedback", {
          params: { timeRange, filter },
        });
        return response.data.data || {};
      } catch (error) {
        throw new Error(
          handleError(error, "Failed to fetch feedback analytics")
        );
      }
    },
    []
  );

  // Export reports functions
  const exportReport = useCallback(
    async (reportType, format, dateRange, options = {}) => {
      try {
        const response = await api.post(
          "/reports/export",
          {
            reportType,
            format,
            dateRange,
            ...options,
          },
          {
            responseType: "blob", // For file downloads
          }
        );
        return response.data;
      } catch (error) {
        throw new Error(handleError(error, "Failed to export report"));
      }
    },
    []
  );

  // =====================================================
  // 🔟 RECEPTIONIST SPECIFIC FUNCTIONS
  // =====================================================

  // Guest account management functions
  const createGuestAccount = useCallback(async (guestData) => {
    try {
      const response = await api.post("/users/guest", guestData);
      return response.data;
    } catch (error) {
      throw new Error(handleError(error, "Failed to create guest account"));
    }
  }, []);

  // Walk-in booking functions
  const createWalkInBooking = useCallback(async (bookingData) => {
    try {
      const response = await api.post("/reservations/walk-in", bookingData);
      return response.data;
    } catch (error) {
      throw new Error(handleError(error, "Failed to create walk-in booking"));
    }
  }, []);

  // Room availability functions
  const fetchRoomAvailability = useCallback(
    async (date, roomType = "all", status = "all", searchTerm = "") => {
      try {
        const response = await api.get("/rooms/availability", {
          params: { date, roomType, status, searchTerm },
        });
        return response.data.data || [];
      } catch (error) {
        throw new Error(
          handleError(error, "Failed to fetch room availability")
        );
      }
    },
    []
  );

  const markRoomAvailable = useCallback(async (roomId) => {
    try {
      const response = await api.patch(`/rooms/${roomId}/available`);
      return response.data;
    } catch (error) {
      throw new Error(handleError(error, "Failed to mark room as available"));
    }
  }, []);

  // Check-in checkout functions
  const checkOutGuest = useCallback(async (reservationId) => {
    try {
      const response = await api.patch(
        `/reservations/${reservationId}/checkout`
      );
      return response.data;
    } catch (error) {
      throw new Error(handleError(error, "Failed to check-out guest"));
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
    fetchMaintenanceStats,
    fetchMaintenanceIssues,
    fetchMaintenanceSchedule,
    fetchMaintenanceTrends,
    updateMaintenanceIssueStatus,
    filterMaintenanceIssues,
    searchMaintenanceIssues,
    getMaintenanceIssueById,
    assignMaintenanceIssue,
    createMaintenanceIssue,

    // Housekeeping methods
    fetchHousekeepingStats,
    fetchHousekeepingTasks,
    fetchHousekeepingSchedule,
    updateHousekeepingTaskStatus,
    filterHousekeepingTasks,
    searchHousekeepingTasks,
    getHousekeepingTaskById,

    // Notifications methods
    fetchNotifications,
    markNotificationAsRead,

    // Real-time methods
    fetchActiveUsers,

    // Guest methods
    fetchGuestBookings,
    fetchBookingHistory,
    cancelBooking,
    checkInBooking,
    fetchGuestServiceRequests,
    submitServiceRequest,
    cancelServiceRequest,
    trackServiceRequest,
    submitFeedback,
    fetchRecentFeedback,
    fetchRoomServiceMenu,
    fetchAdditionalServices,
    placeRoomServiceOrder,
    placeServiceRequest,
    fetchGuestStats,
    updateGuestPreferences,

    // Manager methods
    fetchPerformanceMetrics,
    fetchOccupancyReports,
    fetchRevenueReports,
    fetchFeedbacks,
    updateFeedbackStatus,
    respondToFeedback,
    fetchFeedbackAnalytics,
    exportReport,

    // Receptionist methods
    createGuestAccount,
    createWalkInBooking,
    fetchRoomAvailability,
    markRoomAvailable,
    checkOutGuest,
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
