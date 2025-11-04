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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roomsRes, housekeepingRes] = await Promise.all([
          api.get("/rooms"),
          api.get("/housekeeping")
        ]);
        setRooms(roomsRes.data.data);
        setHousekeeping(housekeepingRes.data.data);
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
  const roomsToClean = rooms.filter((r) => r.status === "needs-cleaning").length;
  const cleanedToday = housekeeping.filter((h) => new Date(h.completedAt).toDateString() === new Date().toDateString()).length;
  const pendingRequests = housekeeping.filter((h) => h.status === "pending").length;

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
              <p className="text-sm font-secondary text-gray-700">Rooms to Clean</p>
              <p className="text-2xl font-primary">{roomsToClean}</p>
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
              <p className="text-sm font-secondary text-gray-700">Cleaned Today</p>
              <p className="text-2xl font-primary">{cleanedToday}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-accent/20 text-accent mr-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-secondary text-gray-700">Pending Requests</p>
              <p className="text-2xl font-primary">{pendingRequests}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart + Tasks */}
      <div className="container mx-auto py-4 px-4">
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
              {[
                {
                  id: 401,
                  room: "Room 101",
                  task: "Deep Clean",
                  status: "Completed",
                },
                {
                  id: 402,
                  room: "Room 205",
                  task: "Standard Clean",
                  status: "In Progress",
                },
                {
                  id: 403,
                  room: "Room 310",
                  task: "Restock Amenities",
                  status: "Pending",
                },
              ].map((t) => (
                <li key={t.id} className="flex justify-between text-sm font-secondary">
                  <span className="font-medium">{t.room}</span>
                  <span className="text-gray-700">
                    {t.task} – {t.status}
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
            Manage Tasks
          </button>
        </div>
      </div>
    </>
  );
};

export default HousekeepingDashboard;
