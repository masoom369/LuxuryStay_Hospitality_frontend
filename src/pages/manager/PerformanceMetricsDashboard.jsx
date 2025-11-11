import { useState, useEffect } from "react";
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
  Award,
  Download,
  Loader2
} from "lucide-react";
import { useDashboardContext } from "../../context/DashboardContext";

const PerformanceMetricsDashboard = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [metricType, setMetricType] = useState('all');
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { fetchPerformanceMetrics, exportReport } = useDashboardContext();

  useEffect(() => {
    loadPerformanceData();
  }, [timeRange, metricType]);

  const loadPerformanceData = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchPerformanceMetrics(timeRange, metricType);
      setPerformanceData(data);
    } catch (err) {
      setError(err.message || 'Failed to load performance metrics');
      console.error('Error loading performance metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const blob = await exportReport('performance', 'pdf', { 
        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), 
        end: new Date().toISOString() 
      });
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `performance-report-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export failed:', err);
      alert('Failed to export report');
    }
  };

  // Default/fallback data
  const defaultData = {
    kpiData: [
      { month: "Jan", occupancy: 75, revenue: 18000, guestSatisfaction: 4.2, avgStay: 2.1 },
      { month: "Feb", occupancy: 82, revenue: 22000, guestSatisfaction: 4.5, avgStay: 2.3 },
      { month: "Mar", occupancy: 88, revenue: 25000, guestSatisfaction: 4.6, avgStay: 2.4 },
      { month: "Apr", occupancy: 79, revenue: 21000, guestSatisfaction: 4.3, avgStay: 2.2 },
      { month: "May", occupancy: 91, revenue: 28000, guestSatisfaction: 4.7, avgStay: 2.5 },
      { month: "Jun", occupancy: 85, revenue: 24000, guestSatisfaction: 4.5, avgStay: 2.3 },
    ],
    performanceIndicators: [
      { name: "Occupancy Rate", value: 85.3, target: 85, status: "on-track" },
      { name: "Revenue per Available Room", value: 142, target: 135, status: "above-target" },
      { name: "Average Daily Rate", value: 234, target: 220, status: "above-target" },
      { name: "Guest Satisfaction", value: 4.7, target: 4.5, status: "above-target" },
      { name: "Staff Productivity", value: 88, target: 85, status: "above-target" },
      { name: "Revenue Growth", value: 12.5, target: 10, status: "above-target" },
    ],
    roomPerformance: [
      { type: "Standard", occupancy: 82, revenue: 12000, satisfaction: 4.2 },
      { type: "Deluxe", occupancy: 87, revenue: 10000, satisfaction: 4.6 },
      { type: "Executive", occupancy: 91, revenue: 8000, satisfaction: 4.7 },
      { type: "Suite", occupancy: 85, revenue: 3500, satisfaction: 4.8 },
      { type: "Presidential", occupancy: 78, revenue: 1000, satisfaction: 4.9 },
    ],
    summary: {
      occupancyRate: 85.3,
      avgRating: 4.7,
      revenue: 24500,
      bookings: 1248,
      occupancyChange: 3.2,
      ratingChange: 0.2,
      revenueChange: 12.5,
      bookingsChange: 8.7
    }
  };

  const data = performanceData || defaultData;
  const COLORS = ['#a37d4c', '#b89a67', '#d4b98c', '#e6d5b8', '#f0e6d2'];

  if (loading) {
    return (
      <div className="container mx-auto py-14 px-4 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
        <span className="ml-2 text-gray-600">Loading performance metrics...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-14 px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
          {error}
        </div>
      </div>
    );
  }

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
            <button 
              onClick={handleExport}
              className="bg-accent text-white hover:bg-accent/90 transition-colors py-2 px-4 rounded-md flex items-center"
            >
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
                <p className="text-2xl font-bold text-accent">{data.summary?.occupancyRate || 85.3}%</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" /> +{data.summary?.occupancyChange || 3.2}% vs last month
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
                <p className="text-2xl font-bold text-accent">{data.summary?.avgRating || 4.7}/5</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" /> +{data.summary?.ratingChange || 0.2} vs last month
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
                <p className="text-2xl font-bold text-accent">${(data.summary?.revenue || 24500).toLocaleString()}</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" /> +{data.summary?.revenueChange || 12.5}% vs last month
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
                <p className="text-2xl font-bold text-accent">{(data.summary?.bookings || 1248).toLocaleString()}</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" /> +{data.summary?.bookingsChange || 8.7}% vs last month
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
              <LineChart data={data.kpiData}>
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
              {data.performanceIndicators.map((indicator, index) => (
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
                        {indicator.status === 'above-target' ? 'Above' : 
                         indicator.status === 'on-track' ? 'On Track' : 'Below'}
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
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-primary text-accent mb-4">Performance by Room Type</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.roomPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="occupancy" name="Occupancy %" fill="#a37d4c" />
                <Bar dataKey="satisfaction" name="Satisfaction" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-primary text-accent mb-4">Performance Radar</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                { subject: 'Occupancy', A: data.summary?.occupancyRate || 85, fullMark: 100 },
                { subject: 'Revenue', A: 90, fullMark: 100 },
                { subject: 'Satisfaction', A: (data.summary?.avgRating || 4.7) * 20, fullMark: 100 },
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

        {/* Performance Summary Table */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h3 className="text-lg font-primary text-accent mb-4">Performance Summary</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Metric</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Target</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Variance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trend</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.performanceIndicators.map((indicator, index) => (
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
      </div>
    </div>
  );
};

export default PerformanceMetricsDashboard;