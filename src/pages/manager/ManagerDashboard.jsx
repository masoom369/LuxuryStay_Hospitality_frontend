import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Calendar, DoorOpen, Users, TrendingUp, Loader2 } from "lucide-react";
import { useDashboardContext } from "../../context/DashboardContext";

const ManagerDashboard = () => {
  const [stats, setStats] = useState(null);
  const [revenueData, setRevenueData] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { 
    fetchDashboardStats, 
    fetchDashboardAnalytics, 
    fetchRecentReservations 
  } = useDashboardContext();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    setError('');
    try {
      const [statsData, analyticsData, reservationsData] = await Promise.all([
        fetchDashboardStats(),
        fetchDashboardAnalytics('7d'),
        fetchRecentReservations(5)
      ]);

      setStats(statsData);
      setRevenueData(analyticsData.revenueData || []);
      setRecentBookings(reservationsData || []);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data');
      console.error('Error loading dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const defaultData = {
    stats: {
      totalRooms: 120,
      occupancyRate: 82.3,
      checkInsToday: 2,
      revenue7d: 18000
    },
    revenueData: [
      { day: "Mon", amount: 1800 },
      { day: "Tue", amount: 2200 },
      { day: "Wed", amount: 1900 },
      { day: "Thu", amount: 2500 },
      { day: "Fri", amount: 3100 },
      { day: "Sat", amount: 3800 },
      { day: "Sun", amount: 3500 },
    ],
    recentBookings: [
      { id: 201, guest: { username: "Alice Johnson" }, room: { name: "Executive Suite" }, checkInDate: "Oct 30" },
      { id: 202, guest: { username: "Bob Wilson" }, room: { name: "Deluxe" }, checkInDate: "Oct 31" },
      { id: 203, guest: { username: "Carol Brown" }, room: { name: "Standard" }, checkInDate: "Nov 1" },
    ]
  };

  const displayStats = stats || defaultData.stats;
  const displayRevenue = revenueData.length > 0 ? revenueData : defaultData.revenueData;
  const displayBookings = recentBookings.length > 0 ? recentBookings : defaultData.recentBookings;

  if (loading) {
    return (
      <div className="container mx-auto py-14 px-4 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
        <span className="ml-2 text-gray-600">Loading dashboard...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-14 px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 mb-6">
          {error}
        </div>
        {/* Show default data on error */}
      </div>
    );
  }

  return (
    <>
      {/* Stats */}
      <div className="container mx-auto py-4 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-accent/20 text-accent mr-4">
              <DoorOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-secondary text-gray-700">Total Rooms</p>
              <p className="text-2xl font-primary">{displayStats.totalRooms || 0}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-accent/20 text-accent mr-4">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-secondary text-gray-700">Occupancy</p>
              <p className="text-2xl font-primary">{displayStats.occupancyRate || 0}%</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-accent/20 text-accent mr-4">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-secondary text-gray-700">Check-ins Today</p>
              <p className="text-2xl font-primary">{displayStats.checkInsToday || 0}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-accent/20 text-accent mr-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-secondary text-gray-700">Revenue (7d)</p>
              <p className="text-2xl font-primary">${(displayStats.revenue7d || 0).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart + Bookings */}
      <div className="container mx-auto py-4 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-primary mb-4">Revenue – Last 7 Days</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={displayRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#a37d4c"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-primary mb-4">Recent Bookings</h3>
            {displayBookings.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No recent bookings
              </div>
            ) : (
              <ul className="space-y-3">
                {displayBookings.map((booking) => (
                  <li key={booking.id || booking._id} className="flex justify-between text-sm font-secondary">
                    <span className="font-medium">
                      {booking.guest?.username || booking.guest?.name || 'Unknown Guest'}
                    </span>
                    <span className="text-gray-700">
                      {booking.room?.name || booking.room?.roomNumber || 'Room'} – {new Date(booking.checkInDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto py-4 px-4">
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => window.location.href = '/'}
            className="btn btn-primary w-full py-2 px-3 rounded-md"
          >
            View Public Site
          </button>
          <button 
            onClick={() => window.location.href = '/manager/reporting'}
            className="btn btn-secondary w-full py-2 px-3 rounded-md"
          >
            Generate Report
          </button>
        </div>
      </div>
    </>
  );
};

export default ManagerDashboard;