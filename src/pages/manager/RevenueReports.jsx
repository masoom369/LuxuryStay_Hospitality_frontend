import { useState, useEffect } from "react";
import { 
  BarChart,
  Bar,
  AreaChart,
  Area,
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
  Download,
  TrendingUp, 
  TrendingDown,
  Loader2
} from "lucide-react";
import { useDashboardContext } from "../../context/DashboardContext";

const RevenueReports = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [filter, setFilter] = useState('all');
  const [revenueData, setRevenueData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { fetchRevenueReports, exportReport } = useDashboardContext();

  useEffect(() => {
    loadRevenueData();
  }, [timeRange, filter]);

  const loadRevenueData = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchRevenueReports(timeRange, filter);
      setRevenueData(data);
    } catch (err) {
      setError(err.message || 'Failed to load revenue reports');
      console.error('Error loading revenue reports:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const blob = await exportReport('revenue', 'pdf', { 
        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), 
        end: new Date().toISOString() 
      }, { filter });
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `revenue-report-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export failed:', err);
      alert('Failed to export report');
    }
  };

  const defaultData = {
    revenueTrend: [
      { date: "Nov 1", revenue: 1800, expenses: 600, profit: 1200 },
      { date: "Nov 2", revenue: 2200, expenses: 750, profit: 1450 },
      { date: "Nov 3", revenue: 1900, expenses: 680, profit: 1220 },
      { date: "Nov 4", revenue: 2500, expenses: 820, profit: 1680 },
      { date: "Nov 5", revenue: 3100, expenses: 950, profit: 2150 },
      { date: "Nov 6", revenue: 3800, expenses: 1100, profit: 2700 },
      { date: "Nov 7", revenue: 3500, expenses: 1050, profit: 2450 },
    ],
    revenueBySource: [
      { name: "Room Revenue", value: 65 },
      { name: "Food & Beverage", value: 15 },
      { name: "Spa Services", value: 10 },
      { name: "Conference", value: 7 },
      { name: "Other", value: 3 },
    ],
    revenueByRoomType: [
      { name: "Standard", revenue: 12000, percentage: 35 },
      { name: "Deluxe", revenue: 10000, percentage: 29 },
      { name: "Executive", revenue: 8000, percentage: 23 },
      { name: "Suite", revenue: 3500, percentage: 10 },
      { name: "Presidential", revenue: 1000, percentage: 3 },
    ],
    summary: {
      totalRevenue: 24500,
      totalExpenses: 7800,
      netProfit: 16700,
      profitMargin: 68.2,
      avgDailyRevenue: 3500,
      revenuePerAvailableRoom: 142
    }
  };

  const data = revenueData || defaultData;
  const COLORS = ['#a37d4c', '#b89a67', '#d4b98c', '#e6d5b8', '#f0e6d2'];

  if (loading) {
    return (
      <div className="container mx-auto py-14 px-4 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
        <span className="ml-2 text-gray-600">Loading revenue reports...</span>
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
          <h2 className="text-2xl font-primary text-accent px-3">Revenue Reports</h2>
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
              <option value="all">All Sources</option>
              <option value="rooms">Room Revenue</option>
              <option value="services">Services</option>
              <option value="food">F&B</option>
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

        {/* Revenue Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Total Revenue</p>
            <p className="text-2xl font-bold text-accent">${(data.summary?.totalRevenue || 0).toLocaleString()}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Expenses</p>
            <p className="text-2xl font-bold text-accent">${(data.summary?.totalExpenses || 0).toLocaleString()}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Net Profit</p>
            <p className="text-2xl font-bold text-accent">${(data.summary?.netProfit || 0).toLocaleString()}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Profit Margin</p>
            <p className="text-2xl font-bold text-accent">{data.summary?.profitMargin || 0}%</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">ADR</p>
            <p className="text-2xl font-bold text-accent">${data.summary?.avgDailyRevenue || 0}</p>
          </div>
        </div>

        {/* Revenue Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-primary text-accent mb-4">Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data.revenueTrend || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
                <Area type="monotone" dataKey="revenue" stackId="1" stroke="#a37d4c" fill="#a37d4c" fillOpacity={0.2} />
                <Area type="monotone" dataKey="expenses" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue vs Profit */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-primary text-accent mb-4">Revenue vs Profit</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.revenueTrend || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
                <Bar dataKey="revenue" fill="#a37d4c" name="Revenue" />
                <Bar dataKey="profit" fill="#10b981" name="Profit" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-primary text-accent mb-4">Revenue by Source</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.revenueBySource || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {(data.revenueBySource || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-primary text-accent mb-4">Revenue by Room Type</h3>
            <div className="space-y-4">
              {(data.revenueByRoomType || []).map((type, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{type.name}</span>
                    <span className="text-sm font-medium text-gray-700">${type.revenue.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        width: `${type.percentage}%`,
                        backgroundColor: COLORS[index % COLORS.length]
                      }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {type.percentage}% of total revenue
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Details Table */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h3 className="text-lg font-primary text-accent mb-4">Revenue Breakdown</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">YoY Change</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth Rate</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {(data.revenueBySource || []).map((source, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{source.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${Math.round((data.summary?.totalRevenue || 0) * (source.value/100)).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{source.value}%</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {index === 0 ? (
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        {index === 0 ? '+5.2%' : '-2.1%'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900 mr-2">{index === 0 ? '12.3%' : '8.7%'}</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full" 
                            style={{ 
                              width: `${index === 0 ? '85%' : '60%'}`,
                              backgroundColor: COLORS[index % COLORS.length]
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Total</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-accent">${(data.summary?.totalRevenue || 0).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">100%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">+7.8%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueReports;