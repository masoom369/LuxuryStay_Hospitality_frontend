import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Calendar, DoorOpen, Users, TrendingUp, CheckCircle, Clock, AlertCircle, Home } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useDashboardContext } from "../../context/DashboardContext";
import api from "../../services/api";

const HousekeepingDashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [stats, setStats] = useState({
    totalRooms: 0,
    roomsToClean: 0,
    inProgress: 0,
    cleanedToday: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { user } = useAuth();
  const { 
    housekeepingTasks, 
    fetchHousekeepingTasks, 
    fetchHousekeepingStats 
  } = useDashboardContext();

  // Get the hotel ID assigned to the housekeeping staff
  const assignedHotelId = user?.assignments?.[0]?.hotel?._id || user?.assignments?.[0]?.hotel;

  useEffect(() => {
    const fetchData = async () => {
      if (!assignedHotelId) {
        setError("No hotel assignment found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch rooms data
        const roomsRes = await api.get("/rooms");
        const hotelRooms = roomsRes.data.data.filter(room => 
          room.hotel === assignedHotelId || room.hotel?._id === assignedHotelId
        );
        setRooms(hotelRooms);

        // Fetch housekeeping tasks for this hotel
        await fetchHousekeepingTasks();

        // Fetch housekeeping stats
        const statsData = await fetchHousekeepingStats();
        
        // Calculate stats
        const totalRooms = hotelRooms.length;
        const occupied = hotelRooms.filter((r) => r.status === "occupied").length;
        const roomsToClean = hotelRooms.filter((r) => r.status === "needs-cleaning").length;
        
        const today = new Date().toDateString();
        const cleanedToday = housekeepingTasks.filter((h) => 
          h.completionTime && 
          new Date(h.completionTime).toDateString() === today &&
          h.status === "completed"
        ).length;
        
        const inProgress = housekeepingTasks.filter((h) => h.status === "in-progress").length;

        setStats({
          totalRooms,
          roomsToClean,
          inProgress,
          cleanedToday
        });

        // Generate weekly data from actual housekeeping tasks
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (6 - i));
          return date;
        });

        const weeklyStats = last7Days.map(date => {
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          const dateString = date.toDateString();
          
          const cleaned = housekeepingTasks.filter(task => {
            if (!task.completionTime) return false;
            const taskDate = new Date(task.completionTime).toDateString();
            return taskDate === dateString && task.status === "completed";
          }).length;

          return { day: dayName, cleaned };
        });

        setWeeklyData(weeklyStats);

      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.response?.data?.message || "Failed to fetch housekeeping data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [assignedHotelId, fetchHousekeepingTasks, fetchHousekeepingStats]);

  if (loading) {
    return (
      <div className="container mx-auto py-4 px-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-4 px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4 px-4">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-accent/20 text-accent mr-4">
              <Home className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-secondary text-gray-700">Total Rooms</p>
              <p className="text-2xl font-primary">{stats.totalRooms}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-accent/20 text-accent mr-4">
              <DoorOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-secondary text-gray-700">Rooms to Clean</p>
              <p className="text-2xl font-primary">{stats.roomsToClean}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-accent/20 text-accent mr-4">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-secondary text-gray-700">In Progress</p>
              <p className="text-2xl font-primary">{stats.inProgress}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-accent/20 text-accent mr-4">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-secondary text-gray-700">Cleaned Today</p>
              <p className="text-2xl font-primary">{stats.cleanedToday}</p>
            </div>
          </div>
        </div>

        {/* Chart + Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-primary mb-4">Cleaning Progress – Last 7 Days</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="cleaned"
                  stroke="#a37d4c"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-primary mb-4">Recent Tasks</h3>
            {housekeepingTasks.length === 0 ? (
              <p className="text-sm text-gray-500">No recent tasks</p>
            ) : (
              <ul className="space-y-3">
                {housekeepingTasks.slice(0, 3).map((hk) => (
                  <li key={hk._id} className="flex justify-between text-sm font-secondary">
                    <span className="font-medium">Room {hk.room?.roomNumber || 'N/A'}</span>
                    <span className="text-gray-700 capitalize">
                      {hk.taskType.replace(/_/g, ' ')} – {hk.status.replace(/-/g, ' ')}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/housekeeping/tasks"
            className="bg-accent text-white hover:bg-accent/90 transition-colors py-4 px-6 rounded-md flex items-center justify-center"
          >
            <Clock className="w-5 h-5 mr-2" />
            View My Tasks
          </Link>
          <Link
            to="/housekeeping/schedule"
            className="bg-accent text-white hover:bg-accent/90 transition-colors py-4 px-6 rounded-md flex items-center justify-center"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Schedule Tasks
          </Link>
          <Link
            to="/housekeeping/report-issue"
            className="bg-accent text-white hover:bg-accent/90 transition-colors py-4 px-6 rounded-md flex items-center justify-center"
          >
            <AlertCircle className="w-5 h-5 mr-2" />
            Report Issue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HousekeepingDashboard;