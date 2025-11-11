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
import { Calendar, DoorOpen, Users, TrendingUp, UserPlus, UserCheck, Home } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useDashboardContext } from "../../context/DashboardContext";
import api from "../../services/api";

const ReceptionistDashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [stats, setStats] = useState({
    totalRooms: 0,
    occupancy: 0,
    pendingCheckins: 0,
    todaysCheckouts: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { user } = useAuth();
  const { 
    recentReservations,
    fetchRecentReservations,
    fetchDashboardStats
  } = useDashboardContext();

  // Get the hotel ID assigned to the receptionist
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

        // Fetch recent reservations
        await fetchRecentReservations(10);

        // Calculate stats
        const totalRooms = hotelRooms.length;
        const occupied = hotelRooms.filter((r) => r.status === "occupied").length;
        const occupancy = totalRooms ? ((occupied / totalRooms) * 100).toFixed(1) : 0;
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const pendingCheckins = recentReservations.filter((r) => {
          const checkInDate = new Date(r.checkInDate);
          checkInDate.setHours(0, 0, 0, 0);
          return r.status === "confirmed" && checkInDate >= today;
        }).length;
        
        const todaysCheckouts = recentReservations.filter((r) => {
          const checkOutDate = new Date(r.checkOutDate);
          checkOutDate.setHours(0, 0, 0, 0);
          const todayDate = new Date();
          todayDate.setHours(0, 0, 0, 0);
          return r.status === "checked-in" && checkOutDate.getTime() === todayDate.getTime();
        }).length;

        setStats({
          totalRooms,
          occupancy,
          pendingCheckins,
          todaysCheckouts
        });

        // Generate weekly check-in data
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (6 - i));
          return date;
        });

        const weeklyStats = last7Days.map(date => {
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          const dateString = date.toDateString();
          
          const count = recentReservations.filter(reservation => {
            if (!reservation.checkInDate) return false;
            const checkInDate = new Date(reservation.checkInDate).toDateString();
            return checkInDate === dateString && reservation.status === "checked-in";
          }).length;

          return { day: dayName, count };
        });

        setWeeklyData(weeklyStats);

      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.response?.data?.message || "Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [assignedHotelId, fetchRecentReservations]);

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
              <DoorOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-secondary text-gray-700">Total Rooms</p>
              <p className="text-2xl font-primary">{stats.totalRooms}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-accent/20 text-accent mr-4">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-secondary text-gray-700">Occupancy</p>
              <p className="text-2xl font-primary">{stats.occupancy}%</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-accent/20 text-accent mr-4">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-secondary text-gray-700">Pending Check-ins</p>
              <p className="text-2xl font-primary">{stats.pendingCheckins}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-accent/20 text-accent mr-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-secondary text-gray-700">Today's Check-outs</p>
              <p className="text-2xl font-primary">{stats.todaysCheckouts}</p>
            </div>
          </div>
        </div>

        {/* Chart + Bookings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-primary mb-4">Check-ins – Last 7 Days</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#a37d4c"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-primary mb-4">Recent Bookings</h3>
            {recentReservations.length === 0 ? (
              <p className="text-sm text-gray-500">No recent bookings</p>
            ) : (
              <ul className="space-y-3">
                {recentReservations.slice(0, 3).map((reservation) => (
                  <li key={reservation._id} className="flex justify-between text-sm font-secondary">
                    <span className="font-medium">
                      {reservation.guest?.username || reservation.guest?.profile?.firstName || 'Guest'}
                    </span>
                    <span className="text-gray-700">
                      {reservation.room?.roomType || 'Room'} – {new Date(reservation.checkInDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
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
            to="/receptionist/create-guest"
            className="bg-accent text-white hover:bg-accent/90 transition-colors py-4 px-6 rounded-md flex items-center justify-center"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Create Guest Account
          </Link>
          <Link
            to="/receptionist/walk-in"
            className="bg-accent text-white hover:bg-accent/90 transition-colors py-4 px-6 rounded-md flex items-center justify-center"
          >
            <UserCheck className="w-5 h-5 mr-2" />
            Walk-in Booking
          </Link>
          <Link
            to="/receptionist/room-availability"
            className="bg-accent text-white hover:bg-accent/90 transition-colors py-4 px-6 rounded-md flex items-center justify-center"
          >
            <Home className="w-5 h-5 mr-2" />
            Room Availability
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReceptionistDashboard;