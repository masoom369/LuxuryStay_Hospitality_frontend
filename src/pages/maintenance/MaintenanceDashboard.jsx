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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [maintenanceRes, roomsRes] = await Promise.all([
          api.get("/maintenance"),
          api.get("/rooms")
        ]);
        setMaintenance(maintenanceRes.data.data);
        setRooms(roomsRes.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const pendingMaintenance = maintenance.filter((m) => m.status === "pending").length;
  const completedToday = maintenance.filter((m) => m.status === "completed" && new Date(m.completedAt).toDateString() === new Date().toDateString()).length;
  const roomsUnderMaintenance = rooms.filter((r) => r.status === "maintenance").length;
  const totalIssues = maintenance.length;

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
              <p className="text-sm font-secondary text-gray-700">Pending Maintenance</p>
              <p className="text-2xl font-primary">{pendingMaintenance}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-accent/20 text-accent mr-4">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-secondary text-gray-700">Completed Today</p>
              <p className="text-2xl font-primary">{completedToday}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-accent/20 text-accent mr-4">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-secondary text-gray-700">Rooms Under Maintenance</p>
              <p className="text-2xl font-primary">{roomsUnderMaintenance}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-accent/20 text-accent mr-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-secondary text-gray-700">Total Issues</p>
              <p className="text-2xl font-primary">{totalIssues}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart + Issues */}
      <div className="container mx-auto py-4 px-4">
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
              {[
                {
                  id: 501,
                  room: "Room 102",
                  issue: "Leaky Faucet",
                  status: "Fixed",
                },
                {
                  id: 502,
                  room: "Room 207",
                  issue: "Broken AC",
                  status: "In Progress",
                },
                {
                  id: 503,
                  room: "Room 315",
                  issue: "WiFi Issue",
                  status: "Pending",
                },
              ].map((i) => (
                <li key={i.id} className="flex justify-between text-sm font-secondary">
                  <span className="font-medium">{i.room}</span>
                  <span className="text-gray-700">
                    {i.issue} – {i.status}
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
            Manage Issues
          </button>
        </div>
      </div>
    </>
  );
};

export default MaintenanceDashboard;
