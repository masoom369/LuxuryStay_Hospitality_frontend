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
import { Calendar, Wrench, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useDashboardContext } from "../../context/DashboardContext";

const MaintenanceDashboard = () => {
  const [maintenance, setMaintenance] = useState([]);
  const [trends, setTrends] = useState([]);
  const [stats, setStats] = useState({
    totalIssues: 0,
    reported: 0,
    assigned: 0,
    inProgress: 0,
    completed: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const { user } = useAuth();
  const { 
    fetchMaintenanceIssues, 
    fetchMaintenanceTrends,
    fetchMaintenanceStats 
  } = useDashboardContext();

  const assignedHotelId = user?.assignments?.[0]?.hotel?._id || user?.assignments?.[0]?.hotel;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      
      try {
        // Fetch all maintenance data in parallel
        const [issuesData, trendsData, statsData] = await Promise.all([
          fetchMaintenanceIssues(),
          fetchMaintenanceTrends().catch(() => []),
          fetchMaintenanceStats().catch(() => ({}))
        ]);

        // Filter issues by assigned hotel if needed
        const hotelIssues = assignedHotelId 
          ? issuesData.filter(issue => {
              const issueHotelId = issue.room?.hotel?._id || issue.room?.hotel;
              return issueHotelId === assignedHotelId;
            })
          : issuesData;

        setMaintenance(hotelIssues);
        
        // Set trends data or use mock data if not available
        if (trendsData && trendsData.length > 0) {
          setTrends(trendsData);
        } else {
          // Fallback to calculating from recent issues
          const last7Days = getLast7DaysTrends(hotelIssues);
          setTrends(last7Days);
        }

        // Calculate stats from the filtered issues
        const calculatedStats = {
          totalIssues: hotelIssues.length,
          reported: hotelIssues.filter(m => m.status === "reported").length,
          assigned: hotelIssues.filter(m => m.status === "assigned").length,
          inProgress: hotelIssues.filter(m => m.status === "in-progress").length,
          completed: hotelIssues.filter(m => m.status === "completed").length
        };
        
        setStats(statsData.totalIssues ? statsData : calculatedStats);
        
      } catch (err) {
        console.error("Error fetching maintenance data:", err);
        setError("Failed to load maintenance data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user, assignedHotelId, fetchMaintenanceIssues, fetchMaintenanceTrends, fetchMaintenanceStats]);

  // Helper function to calculate trends from issues
  const getLast7DaysTrends = (issues) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const last7Days = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dayName = days[date.getDay()];
      
      const completedCount = issues.filter(issue => {
        if (issue.status !== 'completed') return false;
        const issueDate = new Date(issue.updatedAt);
        return issueDate.toDateString() === date.toDateString();
      }).length;

      last7Days.push({
        day: dayName,
        completed: completedCount
      });
    }

    return last7Days;
  };

  if (loading) {
    return (
      <div className="container mx-auto py-4 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading maintenance dashboard...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-4 px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
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
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-secondary text-gray-700">Total Issues</p>
              <p className="text-2xl font-primary">{stats.totalIssues}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-accent/20 text-accent mr-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-secondary text-gray-700">Reported</p>
              <p className="text-2xl font-primary">{stats.reported}</p>
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
              <p className="text-sm font-secondary text-gray-700">Completed</p>
              <p className="text-2xl font-primary">{stats.completed}</p>
            </div>
          </div>
        </div>

        {/* Chart + Issues */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-primary mb-4">Maintenance Trends – Last 7 Days</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trends}>
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
            {maintenance.length === 0 ? (
              <p className="text-gray-500 text-sm">No recent issues found</p>
            ) : (
              <ul className="space-y-3">
                {maintenance.slice(0, 5).map((m) => (
                  <li key={m._id} className="border-b border-gray-100 pb-2 last:border-0">
                    <div className="flex justify-between items-start text-sm font-secondary">
                      <span className="font-medium">Room {m.room?.roomNumber || 'N/A'}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        m.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                        m.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                        m.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {m.priority}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {m.issueType} – {m.status.replace('-', ' ')}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/maintenance/issues"
            className="bg-accent text-white hover:bg-accent/90 transition-colors py-4 px-6 rounded-md flex items-center justify-center"
          >
            <Wrench className="w-5 h-5 mr-2" />
            View All Issues
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
            View Schedule
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceDashboard;