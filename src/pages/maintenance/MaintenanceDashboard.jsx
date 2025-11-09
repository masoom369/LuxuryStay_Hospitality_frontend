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
import { Calendar, DoorOpen, Users, TrendingUp, Wrench, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

const mockMaintenance = [
  { day: "Mon", completed: 3 },
  { day: "Tue", completed: 5 },
  { day: "Wed", completed: 2 },
  { day: "Thu", completed: 7 },
  { day: "Fri", completed: 4 },
  { day: "Sat", completed: 6 },
  { day: "Sun", completed: 8 },
];

const MaintenanceDashboard = () => {
  const [maintenance, setMaintenance] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Get the hotel ID assigned to the maintenance staff
  const assignedHotelId = user?.assignments?.[0]?.hotel?._id || user?.assignments?.[0]?.hotel;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real application, we'd filter by hotel ID
        // For now, we'll fetch all data but in a real app, the backend would filter
        const [maintenanceRes, roomsRes] = await Promise.all([
          api.get("/maintenance"),
          api.get("/rooms")
        ]);
        
        // Filter data by assigned hotel
        const hotelRooms = roomsRes.data.data.filter(room => room.hotel === assignedHotelId);
        const hotelMaintenance = maintenanceRes.data.data.filter(
          m => {
            // In a real app, we'd check if the maintenance issue is for this hotel
            // This would typically involve checking room.hotel === assignedHotelId
            return true; // For now, we're using all data as a placeholder
          }
        );
        
        setMaintenance(hotelMaintenance);
        setRooms(hotelRooms);
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

  const reported = maintenance.filter((m) => m.status === "reported").length;
  const assigned = maintenance.filter((m) => m.status === "assigned").length;
  const inProgress = maintenance.filter((m) => m.status === "in-progress").length;
  const completed = maintenance.filter((m) => m.status === "completed").length;
  const totalIssues = maintenance.length;

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
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-secondary text-gray-700">Total Issues</p>
              <p className="text-2xl font-primary">{totalIssues}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-accent/20 text-accent mr-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-secondary text-gray-700">Reported</p>
              <p className="text-2xl font-primary">{reported}</p>
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
              <p className="text-sm font-secondary text-gray-700">Completed</p>
              <p className="text-2xl font-primary">{completed}</p>
            </div>
          </div>
        </div>

        {/* Chart + Issues */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-primary mb-4">Maintenance Trends – Last 7 Days</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockMaintenance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="#a37d4c"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-primary mb-4">Recent Issues</h3>
            <ul className="space-y-3">
              {maintenance.slice(0, 3).map((m) => (
                <li key={m._id} className="flex justify-between text-sm font-secondary">
                  <span className="font-medium">Room {m.room?.roomNumber || 'N/A'}</span>
                  <span className="text-gray-700">
                    {m.issueType} – {m.status.replace('-', ' ')}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/maintenance/issues"
            className="bg-accent text-white hover:bg-accent/90 transition-colors py-4 px-6 rounded-md flex items-center justify-center"
          >
            <Wrench className="w-5 h-5 mr-2" />
            View Issues
          </Link>
          <Link
            to="/maintenance/report"
            className="bg-accent text-white hover:bg-accent/90 transition-colors py-4 px-6 rounded-md flex items-center justify-center"
          >
            <AlertTriangle className="w-5 h-5 mr-2" />
            Report Issue
          </Link>
          <Link
            to="/maintenance/schedule"
            className="bg-accent text-white hover:bg-accent/90 transition-colors py-4 px-6 rounded-md flex items-center justify-center"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Schedule Maintenance
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceDashboard;
