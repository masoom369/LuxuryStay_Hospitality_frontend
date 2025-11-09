import { useState } from "react";
import { 
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown,
  Users,
  Calendar,
  DollarSign,
  Star,
  Home,
  Clock,
  Award,
  Download
} from "lucide-react";

const PerformanceMetricsDashboard = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [metricType, setMetricType] = useState('all');

  // Mock data for performance metrics
  const kpiData = [
    { month: "Jan", occupancy: 75, revenue: 18000, guestSatisfaction: 4.2, avgStay: 2.1 },
    { month: "Feb", occupancy: 82, revenue: 22000, guestSatisfaction: 4.5, avgStay: 2.3 },
    { month: "Mar", occupancy: 88, revenue: 25000, guestSatisfaction: 4.6, avgStay: 2.4 },
    { month: "Apr", occupancy: 79, revenue: 21000, guestSatisfaction: 4.3, avgStay: 2.2 },
    { month: "May", occupancy: 91, revenue: 28000, guestSatisfaction: 4.7, avgStay: 2.5 },
    { month: "Jun", occupancy: 85, revenue: 24000, guestSatisfaction: 4.5, avgStay: 2.3 },
  ];

  const performanceIndicators = [
    { name: "Occupancy Rate", value: 85.3, target: 85, status: "on-track" },
    { name: "Revenue per Available Room", value: 142, target: 135, status: "above-target" },
    { name: "Average Daily Rate", value: 234, target: 220, status: "above-target" },
    { name: "Guest Satisfaction", value: 4.7, target: 4.5, status: "above-target" },
    { name: "Staff Productivity", value: 88, target: 85, status: "above-target" },
    { name: "Revenue Growth", value: 12.5, target: 10, status: "above-target" },
  ];

  const roomPerformance = [
    { type: "Standard", occupancy: 82, revenue: 12000, satisfaction: 4.2 },
    { type: "Deluxe", occupancy: 87, revenue: 10000, satisfaction: 4.6 },
    { type: "Executive", occupancy: 91, revenue: 8000, satisfaction: 4.7 },
    { type: "Suite", occupancy: 85, revenue: 3500, satisfaction: 4.8 },
    { type: "Presidential", occupancy: 78, revenue: 1000, satisfaction: 4.9 },
  ];

  const COLORS = ['#a37d4c', '#b89a67', '#d4b98c', '#e6d5b8', '#f0e6d2'];

  return (
    <div className="container mx-auto py-14 px-4">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-2xl font-primary text-accent px-3">Performance Metrics Dashboard</h2>
          <div className="flex flex-wrap gap-3">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-accent focus:border-accent"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <select 
              value={metricType}
              onChange={(e) => setMetricType(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-accent focus:border-accent"
            >
              <option value="all">All Metrics</option>
              <option value="financial">Financial</option>
              <option value="operational">Operational</option>
              <option value="guest">Guest Experience</option>
            </select>
            <button className="bg-accent text-white hover:bg-accent/90 transition-colors py-2 px-4 rounded-md flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Occupancy Rate</p>
                <p className="text-2xl font-bold text-accent">85.3%</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" /> +3.2% vs last month
                </p>
              </div>
              <div className="p-3 rounded-full bg-accent/20 text-accent">
                <Home className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Guest Rating</p>
                <p className="text-2xl font-bold text-accent">4.7/5</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" /> +0.2 vs last month
                </p>
              </div>
              <div className="p-3 rounded-full bg-accent/20 text-accent">
                <Star className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenue (30d)</p>
                <p className="text-2xl font-bold text-accent">$24,500</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" /> +12.5% vs last month
                </p>
              </div>
              <div className="p-3 rounded-full bg-accent/20 text-accent">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Bookings (30d)</p>
                <p className="text-2xl font-bold text-accent">1,248</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" /> +8.7% vs last month
                </p>
              </div>
              <div className="p-3 rounded-full bg-accent/20 text-accent">
                <Calendar className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Trends */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-primary text-accent mb-4">Performance Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={kpiData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line yAxisId="left" type="monotone" dataKey="occupancy" stroke="#a37d4c" strokeWidth={2} name="Occupancy" />
                <Line yAxisId="left" type="monotone" dataKey="guestSatisfaction" stroke="#10b981" strokeWidth={2} name="Satisfaction" />
                <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} name="Revenue" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Indicators */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-primary text-accent mb-4">Key Performance Indicators</h3>
            <div className="space-y-4">
              {performanceIndicators.map((indicator, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="w-3/5">
                    <div className="text-sm font-medium text-gray-900">{indicator.name}</div>
                    <div className="text-xs text-gray-500">Target: {indicator.target}</div>
                  </div>
                  <div className="w-2/5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">{indicator.value}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        indicator.status === 'above-target' ? 'bg-green-100 text-green-800' :
                        indicator.status === 'on-track' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {indicator.status === 'above-target' ? 'Above Target' : 
                         indicator.status === 'on-track' ? 'On Track' : 'Below Target'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full" 
                        style={{ 
                          width: `${Math.min((indicator.value / (indicator.target * 1.2)) * 100, 100)}%`,
                          backgroundColor: indicator.status === 'above-target' ? '#10b981' : 
                                          indicator.status === 'on-track' ? '#3b82f6' : '#ef4444'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Room Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Room Performance by Type */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-primary text-accent mb-4">Performance by Room Type</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={roomPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="occupancy" name="Occupancy %" fill="#a37d4c" />
                <Bar dataKey="satisfaction" name="Satisfaction" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Radar */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-primary text-accent mb-4">Performance Radar</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                { subject: 'Occupancy', A: 85, fullMark: 100 },
                { subject: 'Revenue', A: 90, fullMark: 100 },
                { subject: 'Satisfaction', A: 94, fullMark: 100 },
                { subject: 'Service', A: 88, fullMark: 100 },
                { subject: 'Cleanliness', A: 92, fullMark: 100 },
                { subject: 'Value', A: 86, fullMark: 100 },
              ]}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar name="Performance" dataKey="A" stroke="#a37d4c" fill="#a37d4c" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h3 className="text-lg font-primary text-accent mb-4">Performance Summary</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {performanceIndicators.map((indicator, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{indicator.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{indicator.value}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{indicator.target}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        indicator.value >= indicator.target ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {indicator.value >= indicator.target ? '+' : ''}{(indicator.value - indicator.target).toFixed(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        indicator.status === 'above-target' ? 'bg-green-100 text-green-800' :
                        indicator.status === 'on-track' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {indicator.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {indicator.value >= indicator.target ? (
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        {indicator.value >= indicator.target ? 'Improving' : 'Declining'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-primary text-accent mb-4">Top Performers</h3>
            <ul className="space-y-3">
              {[
                { name: "Presidential Suite", metric: "Occupancy: 78%", value: 94 },
                { name: "Executive Room", metric: "Satisfaction: 4.7/5", value: 92 },
                { name: "Front Desk Team", metric: "Response Time: <2min", value: 90 },
                { name: "Housekeeping", metric: "Cleanliness: 4.8/5", value: 89 }
              ].map((item, index) => (
                <li key={index} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-600">{item.metric}</div>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-4 h-4 text-yellow-500 mr-2" />
                    <span className="font-bold text-accent">{item.value}%</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-primary text-accent mb-4">Areas for Improvement</h3>
            <ul className="space-y-3">
              {[
                { name: "Breakfast Quality", metric: "Rating: 3.8/5", value: 68 },
                { name: "Check-in Process", metric: "Avg. Time: 8min", value: 72 },
                { name: "Room Service Speed", metric: "Avg. Time: 35min", value: 75 },
                { name: "Spa Availability", metric: "Booking Rate: 92%", value: 78 }
              ].map((item, index) => (
                <li key={index} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-600">{item.metric}</div>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold text-red-600">{item.value}%</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetricsDashboard;