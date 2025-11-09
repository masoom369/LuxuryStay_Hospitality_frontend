import { useState } from "react";
import { 
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  DollarSign, 
  Star,
  BarChart3,
  FileText,
  Download
} from "lucide-react";

const ReportingDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');

  // Mock data for charts
  const revenueData = [
    { day: "Mon", amount: 1800 },
    { day: "Tue", amount: 2200 },
    { day: "Wed", amount: 1900 },
    { day: "Thu", amount: 2500 },
    { day: "Fri", amount: 3100 },
    { day: "Sat", amount: 3800 },
    { day: "Sun", amount: 3500 },
  ];

  const occupancyData = [
    { month: "Jan", occupancy: 75 },
    { month: "Feb", occupancy: 82 },
    { month: "Mar", occupancy: 88 },
    { month: "Apr", occupancy: 79 },
    { month: "May", occupancy: 91 },
    { month: "Jun", occupancy: 85 },
  ];

  const revenueByRoomType = [
    { name: "Standard", value: 35 },
    { name: "Deluxe", value: 25 },
    { name: "Executive", value: 20 },
    { name: "Suite", value: 15 },
    { name: "Presidential", value: 5 },
  ];

  const COLORS = ['#a37d4c', '#b89a67', '#d4b98c', '#e6d5b8', '#f0e6d2'];

  const stats = [
    { title: "Total Revenue", value: "$34,560", change: "+12.5%", icon: DollarSign, color: "text-green-600" },
    { title: "Avg. Occupancy", value: "82.3%", change: "+3.2%", icon: Calendar, color: "text-blue-600" },
    { title: "Avg. Rating", value: "4.7/5", change: "+0.3", icon: Star, color: "text-amber-600" },
    { title: "Bookings", value: "1,248", change: "+8.7%", icon: FileText, color: "text-purple-600" },
  ];

  return (
    <div className="container mx-auto py-14 px-4">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-primary text-accent px-3">Reporting Dashboard</h2>
          <div className="flex items-center space-x-4">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-accent focus:border-accent"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="1y">Last Year</option>
            </select>
            <button className="bg-accent text-white hover:bg-accent/90 transition-colors py-2 px-4 rounded-md flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-accent">{stat.value}</p>
                  <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                </div>
                <div className="p-3 rounded-full bg-accent/20 text-accent">
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-primary text-accent mb-4">Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="amount" stroke="#a37d4c" fill="#a37d4c" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Occupancy Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-primary text-accent mb-4">Occupancy Rate</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={occupancyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="occupancy" fill="#a37d4c" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Distribution */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-primary text-accent mb-4">Revenue by Room Type</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={revenueByRoomType}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {revenueByRoomType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-primary text-accent mb-4">Key Metrics</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Occupancy Rate</span>
                  <span className="text-sm font-medium text-gray-700">82.3%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full" style={{ width: '82.3%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Revenue per Available Room (RevPAR)</span>
                  <span className="text-sm font-medium text-gray-700">$142</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Average Daily Rate (ADR)</span>
                  <span className="text-sm font-medium text-gray-700">$234</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Guest Satisfaction</span>
                  <span className="text-sm font-medium text-gray-700">4.7/5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Report Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-accent/20 text-accent mr-4">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-primary">Occupancy Reports</h3>
            </div>
            <p className="text-gray-600 mb-4">Detailed analysis of room occupancy rates across different time periods.</p>
            <button className="bg-accent text-white hover:bg-accent/90 transition-colors py-2 px-4 rounded-md">
              View Report
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-accent/20 text-accent mr-4">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-primary">Revenue Reports</h3>
            </div>
            <p className="text-gray-600 mb-4">Financial performance analysis and revenue trends.</p>
            <button className="bg-accent text-white hover:bg-accent/90 transition-colors py-2 px-4 rounded-md">
              View Report
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-accent/20 text-accent mr-4">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-primary">Guest Feedback Analytics</h3>
            </div>
            <p className="text-gray-600 mb-4">Analysis of guest reviews and satisfaction metrics.</p>
            <button className="bg-accent text-white hover:bg-accent/90 transition-colors py-2 px-4 rounded-md">
              View Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportingDashboard;