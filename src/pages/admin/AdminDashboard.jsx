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
import { Calendar, DoorOpen, Users, TrendingUp, Building, User } from "lucide-react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const mockRevenue = [
  { day: "Mon", amount: 2450 },
  { day: "Tue", amount: 3100 },
  { day: "Wed", amount: 2800 },
  { day: "Thu", amount: 3550 },
  { day: "Fri", amount: 4200 },
  { day: "Sat", amount: 5100 },
  { day: "Sun", amount: 4800 },
];

const AdminDashboard = () => {
  const { user } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roomsRes, hotelsRes, usersRes] = await Promise.all([
          api.get("/rooms"),
          api.get("/hotels"),
          api.get("/users")
        ]);
        setRooms(roomsRes.data.data);
        setHotels(hotelsRes.data.data);
        setUsers(usersRes.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalRooms = rooms.length;
  const occupied = rooms.filter((r) => r.status === "occupied").length;
  const occupancy = totalRooms ? ((occupied / totalRooms) * 100).toFixed(1) : 0;
  const totalHotels = hotels.length;
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.isActive).length;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Welcome Message */}
      <div className="container mx-auto py-4 px-4">
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h1 className="text-2xl font-primary text-accent mb-2">
            Welcome back, {user?.username || 'Admin'}!
          </h1>
          <p className="text-gray-600 font-secondary">
            Here's an overview of your hotel management system.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto py-4 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-accent/20 text-accent mr-4">
              <Building className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-secondary text-gray-700">Total Hotels</p>
              <p className="text-2xl font-primary">{totalHotels}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-accent/20 text-accent mr-4">
              <DoorOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-secondary text-gray-700">Total Rooms</p>
              <p className="text-2xl font-primary">{totalRooms}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-accent/20 text-accent mr-4">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-secondary text-gray-700">Occupancy Rate</p>
              <p className="text-2xl font-primary">{occupancy}%</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-accent/20 text-accent mr-4">
              <User className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-secondary text-gray-700">Active Users</p>
              <p className="text-2xl font-primary">{activeUsers}/{totalUsers}</p>
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
              <LineChart data={mockRevenue}>
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
            <ul className="space-y-3">
              {[
                {
                  id: 101,
                  guest: "John Doe",
                  room: "Deluxe Suite",
                  checkin: "Oct 30",
                },
                {
                  id: 102,
                  guest: "Jane Smith",
                  room: "Standard",
                  checkin: "Oct 31",
                },
                {
                  id: 103,
                  guest: "Mike Lee",
                  room: "Family Room",
                  checkin: "Nov 1",
                },
              ].map((b) => (
                <li key={b.id} className="flex justify-between text-sm font-secondary">
                  <span className="font-medium">{b.guest}</span>
                  <span className="text-gray-700">
                    {b.room} – {b.checkin}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-4 px-4">
        <div className="flex flex-wrap gap-4">
          <Link
            to="/"
            className="btn btn-primary w-full py-2 px-3 rounded-md"
          >
            View Public Site
          </Link>
          <button className="btn btn-secondary w-full py-2 px-3 rounded-md">
            Export Report
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
