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

const mockCheckins = [
  { day: "Mon", count: 5 },
  { day: "Tue", count: 8 },
  { day: "Wed", count: 6 },
  { day: "Thu", count: 10 },
  { day: "Fri", count: 12 },
  { day: "Sat", count: 15 },
  { day: "Sun", count: 14 },
];

const ReceptionistDashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roomsRes, reservationsRes] = await Promise.all([
          api.get("/rooms"),
          api.get("/reservations")
        ]);
        setRooms(roomsRes.data.data);
        setReservations(reservationsRes.data.data);
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
  const pendingCheckins = reservations.filter((r) => r.status === "confirmed" && new Date(r.checkInDate) >= new Date()).length;
  const todaysCheckouts = reservations.filter((r) => r.status === "checked-in" && new Date(r.checkOutDate).toDateString() === new Date().toDateString()).length;

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
              <p className="text-sm font-secondary text-gray-700">Pending Check-ins</p>
              <p className="text-2xl font-primary">{pendingCheckins}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-accent/20 text-accent mr-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-secondary text-gray-700">Today's Check-outs</p>
              <p className="text-2xl font-primary">{todaysCheckouts}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart + Bookings */}
      <div className="container mx-auto py-4 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-primary mb-4">Check-ins – Last 7 Days</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockCheckins}>
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
            <ul className="space-y-3">
              {[
                {
                  id: 301,
                  guest: "Emma Wilson",
                  room: "Suite",
                  checkin: "Nov 5",
                },
                {
                  id: 302,
                  guest: "Liam Davis",
                  room: "Deluxe",
                  checkin: "Nov 6",
                },
                {
                  id: 303,
                  guest: "Olivia Garcia",
                  room: "Standard",
                  checkin: "Nov 7",
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
            Manage Bookings
          </button>
        </div>
      </div>
    </>
  );
};

export default ReceptionistDashboard;
