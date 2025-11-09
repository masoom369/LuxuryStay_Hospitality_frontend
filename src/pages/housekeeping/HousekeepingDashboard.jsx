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
import api from "../../services/api";

const mockCleaning = [
  { day: "Mon", cleaned: 12 },
  { day: "Tue", cleaned: 15 },
  { day: "Wed", cleaned: 10 },
  { day: "Thu", cleaned: 18 },
  { day: "Fri", cleaned: 20 },
  { day: "Sat", cleaned: 25 },
  { day: "Sun", cleaned: 22 },
];

const HousekeepingDashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [housekeeping, setHousekeeping] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Get the hotel ID assigned to the housekeeping staff
  const assignedHotelId = user?.assignments?.[0]?.hotel?._id || user?.assignments?.[0]?.hotel;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real application, we'd filter by hotel ID
        // For now, we'll fetch all data but in a real app, the backend would filter
        const [roomsRes, housekeepingRes] = await Promise.all([
          api.get("/rooms"),
          api.get("/housekeeping")
        ]);
        
        // Filter data by assigned hotel
        const hotelRooms = roomsRes.data.data.filter(room => room.hotel === assignedHotelId);
        const hotelHousekeeping = housekeepingRes.data.data.filter(
          hk => {
            // In a real app, we'd check if the housekeeping task is for this hotel
            // This would typically involve checking room.hotel === assignedHotelId
            return true; // For now, we're using all data as a placeholder
          }
        );
        
        setRooms(hotelRooms);
        setHousekeeping(hotelHousekeeping);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (assignedHotelId) {
      fetchData();
    }
  }, [assignedHotelId]);

  const totalRooms = rooms.length;
  const occupied = rooms.filter((r) => r.status === "occupied").length;
  const occupancy = totalRooms ? ((occupied / totalRooms) * 100).toFixed(1) : 0;
  const roomsToClean = rooms.filter((r) => r.status === "needs-cleaning").length;
  const cleanedToday = housekeeping.filter((h) => 
    h.completionTime && 
    new Date(h.completionTime).toDateString() === new Date().toDateString()
  ).length;
  const pendingRequests = housekeeping.filter((h) => h.status === "pending").length;
  const inProgress = housekeeping.filter((h) => h.status === "in-progress").length;

  if (loading) {
    return <div>Loading...</div>;
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
              <p className="text-2xl font-primary">{totalRooms}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-accent/20 text-accent mr-4">
              <DoorOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-secondary text-gray-700">Rooms to Clean</p>
              <p className="text-2xl font-primary">{roomsToClean}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-accent/20 text-accent mr-4">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-secondary text-gray-700">In Progress</p>
              <p className="text-2xl font-primary">{inProgress}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-accent/20 text-accent mr-4">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-secondary text-gray-700">Cleaned Today</p>
              <p className="text-2xl font-primary">{cleanedToday}</p>
            </div>
          </div>
        </div>

        {/* Chart + Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-primary mb-4">Cleaning Progress – Last 7 Days</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockCleaning}>
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
            <ul className="space-y-3">
              {housekeeping.slice(0, 3).map((hk) => (
                <li key={hk._id} className="flex justify-between text-sm font-secondary">
                  <span className="font-medium">Room {hk.room?.roomNumber || 'N/A'}</span>
                  <span className="text-gray-700">
                    {hk.taskType.replace('_', ' ')} – {hk.status.replace('-', ' ')}
                  </span>
                </li>
              ))}
            </ul>
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
