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
import { Calendar, DoorOpen, Users, TrendingUp } from "lucide-react";
import api from "../../services/api";

const mockRevenue = [
  { day: "Mon", amount: 1800 },
  { day: "Tue", amount: 2200 },
  { day: "Wed", amount: 1900 },
  { day: "Thu", amount: 2500 },
  { day: "Fri", amount: 3100 },
  { day: "Sat", amount: 3800 },
  { day: "Sun", amount: 3500 },
];

const ManagerDashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await api.get("/rooms");
        setRooms(response.data.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const totalRooms = rooms.length;
  const occupied = rooms.filter((r) => r.status === "occupied").length;
  const occupancy = totalRooms ? ((occupied / totalRooms) * 100).toFixed(1) : 0;

  if (loading) {
    return <div>Loading...</div>;
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
              <p className="text-2xl font-primary">{totalRooms}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-accent/20 text-accent mr-4">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-secondary text-gray-700">Occupancy</p>
              <p className="text-2xl font-primary">{occupancy}%</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-accent/20 text-accent mr-4">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-secondary text-gray-700">Check-ins Today</p>
              <p className="text-2xl font-primary">2</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-accent/20 text-accent mr-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-secondary text-gray-700">Revenue (7d)</p>
              <p className="text-2xl font-primary">$18,000</p>
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
                  id: 201,
                  guest: "Alice Johnson",
                  room: "Executive Suite",
                  checkin: "Oct 30",
                },
                {
                  id: 202,
                  guest: "Bob Wilson",
                  room: "Deluxe",
                  checkin: "Oct 31",
                },
                {
                  id: 203,
                  guest: "Carol Brown",
                  room: "Standard",
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
            Generate Report
          </button>
        </div>
      </div>
    </>
  );
};

export default ManagerDashboard;
