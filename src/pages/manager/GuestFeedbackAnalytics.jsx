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
  Star,
  MessageCircle,
  TrendingUp, 
  TrendingDown,
  Download,
  Filter
} from "lucide-react";

const GuestFeedbackAnalytics = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [filter, setFilter] = useState('all');

  // Mock data for feedback analytics
  const feedbackData = [
    { date: "Nov 1", count: 8, average: 4.2 },
    { date: "Nov 2", count: 12, average: 4.5 },
    { date: "Nov 3", count: 10, average: 4.3 },
    { date: "Nov 4", count: 15, average: 4.7 },
    { date: "Nov 5", count: 18, average: 4.6 },
    { date: "Nov 6", count: 14, average: 4.4 },
    { date: "Nov 7", count: 16, average: 4.5 },
  ];

  const ratingDistribution = [
    { name: "5 Star", count: 65, percentage: 45 },
    { name: "4 Star", count: 42, percentage: 29 },
    { name: "3 Star", count: 25, percentage: 17 },
    { name: "2 Star", count: 10, percentage: 7 },
    { name: "1 Star", count: 3, percentage: 2 },
  ];

  const categoryRatings = [
    { category: "Cleanliness", rating: 4.7 },
    { category: "Staff Service", rating: 4.6 },
    { category: "Facilities", rating: 4.5 },
    { category: "Location", rating: 4.8 },
    { category: "Value for Money", rating: 4.3 },
  ];

  const feedbackByRoomType = [
    { roomType: "Standard", average: 4.2, count: 32 },
    { roomType: "Deluxe", average: 4.6, count: 28 },
    { roomType: "Executive", average: 4.7, count: 22 },
    { roomType: "Suite", average: 4.8, count: 15 },
    { roomType: "Presidential", average: 4.9, count: 8 },
  ];

  const feedbackSummary = {
    totalReviews: 145,
    averageRating: 4.5,
    positiveReviews: 122,
    negativeReviews: 18,
    responseRate: 92,
    satisfaction: 94
  };

  const COLORS = ['#a37d4c', '#b89a67', '#d4b98c', '#e6d5b8', '#f0e6d2'];

  return (
    <div className="container mx-auto py-14 px-4">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-2xl font-primary text-accent px-3">Guest Feedback Analytics</h2>
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
              <option value="all">All Feedback</option>
              <option value="positive">Positive</option>
              <option value="negative">Negative</option>
              <option value="staff">Staff Service</option>
              <option value="cleanliness">Cleanliness</option>
            </select>
            <button className="bg-accent text-white hover:bg-accent/90 transition-colors py-2 px-4 rounded-md flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Feedback Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Total Reviews</p>
            <p className="text-2xl font-bold text-accent">{feedbackSummary.totalReviews}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Average Rating</p>
            <p className="text-2xl font-bold text-accent">{feedbackSummary.averageRating}/5</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Positive</p>
            <p className="text-2xl font-bold text-accent">{feedbackSummary.positiveReviews}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Response Rate</p>
            <p className="text-2xl font-bold text-accent">{feedbackSummary.responseRate}%</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Satisfaction</p>
            <p className="text-2xl font-bold text-accent">{feedbackSummary.satisfaction}%</p>
          </div>
        </div>

        {/* Feedback Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Feedback Trend */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-primary text-accent mb-4">Feedback Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={feedbackData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line yAxisId="left" type="monotone" dataKey="count" stroke="#a37d4c" strokeWidth={2} name="Reviews" />
                <Line yAxisId="right" type="monotone" dataKey="average" stroke="#10b981" strokeWidth={2} name="Rating" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Rating Distribution */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-primary text-accent mb-4">Rating Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ratingDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#a37d4c" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Rating Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-primary text-accent mb-4">Feedback by Category</h3>
            <div className="space-y-4">
              {categoryRatings.map((category, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{category.category}</span>
                    <span className="text-sm font-medium text-gray-700">{category.rating}/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        width: `${(category.rating / 5) * 100}%`,
                        backgroundColor: COLORS[index % COLORS.length]
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-primary text-accent mb-4">Feedback by Room Type</h3>
            <div className="space-y-4">
              {feedbackByRoomType.map((room, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{room.roomType}</span>
                    <span className="text-sm font-medium text-gray-700">{room.average}/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        width: `${(room.average / 5) * 100}%`,
                        backgroundColor: COLORS[index % COLORS.length]
                      }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {room.count} reviews
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Feedback */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h3 className="text-lg font-primary text-accent mb-4">Recent Feedback</h3>
          <div className="space-y-4">
            {[
              { id: 1, guest: "John Smith", date: "Nov 7, 2023", rating: 5, comment: "Excellent service! The room was spotless and the staff was very helpful." },
              { id: 2, guest: "Emily Johnson", date: "Nov 6, 2023", rating: 4, comment: "Great stay overall. The breakfast could be improved though." },
              { id: 3, guest: "Michael Lee", date: "Nov 5, 2023", rating: 5, comment: "Outstanding experience! Would definitely recommend this hotel." },
              { id: 4, guest: "Sarah Williams", date: "Nov 4, 2023", rating: 3, comment: "Good location, but room service was slow." },
              { id: 5, guest: "David Brown", date: "Nov 3, 2023", rating: 4, comment: "Comfortable stay, nice amenities. Great value for money." }
            ].map(feedback => (
              <div key={feedback.id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{feedback.guest}</h4>
                    <p className="text-sm text-gray-600">{feedback.date}</p>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${
                          i < feedback.rating 
                            ? 'text-yellow-400 fill-yellow-400' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-700">{feedback.comment}</p>
                <div className="mt-2 flex space-x-4">
                  <button className="text-xs text-accent hover:underline">Reply</button>
                  <button className="text-xs text-gray-600 hover:underline">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback Summary Table */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h3 className="text-lg font-primary text-accent mb-4">Feedback Summary</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reviews</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action Items</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categoryRatings.map((category, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900 mr-2">{category.rating}/5</span>
                        <div className="w-12 bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full" 
                            style={{ 
                              width: `${(category.rating / 5) * 100}%`,
                              backgroundColor: COLORS[index % COLORS.length]
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index === 0 ? '145' : index === 1 ? '132' : '118'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {index < 2 ? (
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        {index < 2 ? '+2.1%' : '-1.4%'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index === 4 ? 'Improve pricing strategy' : 'Maintain current standards'}
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

export default GuestFeedbackAnalytics;