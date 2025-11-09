import { useState } from "react";
import { 
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from "recharts";
import { 
  Calendar,
  TrendingUp, 
  TrendingDown,
  Download,
  Filter
} from "lucide-react";

const OccupancyReports = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [filter, setFilter] = useState('all');

  // Mock data for occupancy reports
  const occupancyData = [
    { date: "Nov 1", occupancy: 78 },
    { date: "Nov 2", occupancy: 82 },
    { date: "Nov 3", occupancy: 85 },
    { date: "Nov 4", occupancy: 79 },
    { date: "Nov 5", occupancy: 92 },
    { date: "Nov 6", occupancy: 95 },
    { date: "Nov 7", occupancy: 91 },
  ];

  const occupancyByRoomType = [
    { name: "Standard", occupancy: 75, total: 50, occupied: 38 },
    { name: "Deluxe", occupancy: 82, total: 30, occupied: 25 },
    { name: "Executive", occupancy: 88, total: 20, occupied: 18 },
    { name: "Suite", occupancy: 79, total: 15, occupied: 12 },
    { name: "Presidential", occupancy: 91, total: 5, occupied: 5 },
  ];

  const occupancyByFloor = [
    { floor: "1st", occupancy: 85 },
    { floor: "2nd", occupancy: 78 },
    { floor: "3rd", occupancy: 92 },
    { floor: "4th", occupancy: 88 },
    { floor: "5th", occupancy: 81 },
  ];

  const occupancySummary = {
    totalRooms: 120,
    occupiedRooms: 98,
    occupancyRate: 81.7,
    availableRooms: 22,
    checkIns: 12,
    checkOuts: 8
  };

  const COLORS = ['#a37d4c', '#b89a67', '#d4b98c', '#e6d5b8', '#f0e6d2'];

  return (
    <div className="container mx-auto py-14 px-4">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-2xl font-primary text-accent px-3">Occupancy Reports</h2>
          <div className="flex flex-wrap gap-3">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-accent focus:border-accent"
            >
              <option value="day">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-accent focus:border-accent"
            >
              <option value="all">All Rooms</option>
              <option value="standard">Standard</option>
              <option value="deluxe">Deluxe</option>
              <option value="executive">Executive</option>
              <option value="suite">Suite</option>
              <option value="presidential">Presidential</option>
            </select>
            <button className="bg-accent text-white hover:bg-accent/90 transition-colors py-2 px-4 rounded-md flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Occupancy Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Total Rooms</p>
            <p className="text-2xl font-bold text-accent">{occupancySummary.totalRooms}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Occupied</p>
            <p className="text-2xl font-bold text-accent">{occupancySummary.occupiedRooms}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Available</p>
            <p className="text-2xl font-bold text-accent">{occupancySummary.availableRooms}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Occupancy Rate</p>
            <p className="text-2xl font-bold text-accent">{occupancySummary.occupancyRate}%</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Net Change</p>
            <p className="text-2xl font-bold text-accent">+4</p>
          </div>
        </div>

        {/* Occupancy Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Occupancy Trend */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-primary text-accent mb-4">Occupancy Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={occupancyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="occupancy" stroke="#a37d4c" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Occupancy by Floor */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-primary text-accent mb-4">Occupancy by Floor</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={occupancyByFloor}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="floor" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="occupancy" fill="#a37d4c" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Occupancy by Room Type */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-primary text-accent mb-4">Occupancy by Room Type</h3>
            <div className="space-y-4">
              {occupancyByRoomType.map((type, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{type.name}</span>
                    <span className="text-sm font-medium text-gray-700">{type.occupancy}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        width: `${type.occupancy}%`,
                        backgroundColor: COLORS[index % COLORS.length]
                      }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {type.occupied} of {type.total} rooms occupied
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-primary text-accent mb-4">Room Type Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={occupancyByRoomType}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="occupied"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {occupancyByRoomType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Occupancy Details Table */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h3 className="text-lg font-primary text-accent mb-4">Detailed Occupancy Report</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Rooms</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Occupied</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Occupancy Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Stay</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {occupancyByRoomType.map((type, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{type.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{type.total}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{type.occupied}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{type.total - type.occupied}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900 mr-2">{type.occupancy}%</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full" 
                            style={{ 
                              width: `${type.occupancy}%`,
                              backgroundColor: COLORS[index % COLORS.length]
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2.4 days</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OccupancyReports;