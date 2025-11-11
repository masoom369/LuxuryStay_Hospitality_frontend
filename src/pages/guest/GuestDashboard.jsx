import { useState, useEffect } from 'react';
import { Calendar, FileText, Star, Bell, Loader, AlertCircle, TrendingUp, DollarSign } from 'lucide-react';
import { useDashboardContext } from '../../context/DashboardContext';
import { useAuth } from '../../context/AuthContext';

const GuestDashboard = () => {
  const {
    fetchGuestBookings,
    fetchGuestStats,
    fetchNotifications,
    loading
  } = useDashboardContext();

  const { user } = useAuth();

  const [stats, setStats] = useState({
    upcomingBookings: 0,
    totalBookings: 0,
    points: 0,
    unreadNotifications: 0,
    totalSpent: 0
  });

  const [recentBookings, setRecentBookings] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoadingData(true);
    setError(null);
    
    try {
      const [bookingsData, statsData, notificationsData] = await Promise.all([
        fetchGuestBookings(),
        fetchGuestStats().catch(() => ({
          totalBookings: 0,
          points: 0,
          totalSpent: 0
        })),
        fetchNotifications(5).catch(() => [])
      ]);

      // Calculate upcoming bookings
      const now = new Date();
      const upcoming = bookingsData.filter(booking => 
        new Date(booking.checkIn) > now && 
        ['confirmed', 'pending'].includes(booking.status)
      );

      // Calculate unread notifications
      const unread = notificationsData.filter(n => !n.isRead);

      setStats({
        upcomingBookings: upcoming.length,
        totalBookings: bookingsData.length,
        points: statsData.loyaltyPoints || statsData.points || 0,
        unreadNotifications: unread.length,
        totalSpent: statsData.totalSpent || 0
      });

      // Get most recent bookings (limit to 5)
      const sortedBookings = [...bookingsData]
        .sort((a, b) => new Date(b.checkIn) - new Date(a.checkIn))
        .slice(0, 5);
      
      setRecentBookings(sortedBookings);
      setNotifications(notificationsData.slice(0, 5));
    } catch (err) {
      setError(err.message);
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Confirmed' },
      completed: { bg: 'bg-green-100', text: 'text-green-800', label: 'Completed' },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelled' },
      'checked-in': { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Checked In' }
    };
    
    const config = statusConfig[status] || { bg: 'bg-gray-100', text: 'text-gray-800', label: status };
    return config;
  };

  if (loadingData) {
    return (
      <div className="container mx-auto py-14 px-4">
        <div className="flex justify-center items-center h-64">
          <Loader className="animate-spin text-accent" size={48} />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-14 px-4">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-primary text-accent px-3">Welcome back, {user?.username || 'Guest'}!</h2>
            <p className="text-gray-600 px-3 mt-1">Here's your booking overview</p>
          </div>
          <button
            onClick={loadDashboardData}
            disabled={loadingData}
            className="bg-accent text-white hover:bg-accent/90 transition-colors py-2 px-6 rounded-md flex items-center disabled:opacity-50"
          >
            {loadingData ? (
              <>
                <Loader className="animate-spin mr-2" size={16} />
                Loading...
              </>
            ) : (
              'Refresh'
            )}
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-center">
            <AlertCircle className="mr-2" size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Upcoming Bookings</p>
                <p className="text-3xl font-bold text-accent mt-2">{stats.upcomingBookings}</p>
                <p className="text-xs text-gray-500 mt-1">Active reservations</p>
              </div>
              <div className="bg-accent/10 p-3 rounded-full">
                <Calendar className="w-8 h-8 text-accent" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Bookings</p>
                <p className="text-3xl font-bold text-accent mt-2">{stats.totalBookings}</p>
                <p className="text-xs text-gray-500 mt-1">All time</p>
              </div>
              <div className="bg-accent/10 p-3 rounded-full">
                <FileText className="w-8 h-8 text-accent" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Loyalty Points</p>
                <p className="text-3xl font-bold text-accent mt-2">{stats.points.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">Reward points</p>
              </div>
              <div className="bg-accent/10 p-3 rounded-full">
                <Star className="w-8 h-8 text-accent" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Notifications</p>
                <p className="text-3xl font-bold text-accent mt-2">{stats.unreadNotifications}</p>
                <p className="text-xs text-gray-500 mt-1">Unread messages</p>
              </div>
              <div className="bg-accent/10 p-3 rounded-full">
                <Bell className="w-8 h-8 text-accent" />
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Stats */}
        {stats.totalSpent > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-accent/10 to-accent/5 p-6 rounded-lg border border-accent/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700 text-sm font-medium">Total Spent</p>
                  <p className="text-2xl font-bold text-accent mt-2">
                    ${stats.totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">Lifetime spending</p>
                </div>
                <DollarSign className="w-10 h-10 text-accent" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700 text-sm font-medium">Member Status</p>
                  <p className="text-2xl font-bold text-green-700 mt-2">
                    {stats.points < 500 ? 'Silver' : stats.points < 2000 ? 'Gold' : 'Platinum'}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">Loyalty tier</p>
                </div>
                <TrendingUp className="w-10 h-10 text-green-700" />
              </div>
            </div>
          </div>
        )}

        {/* Recent Bookings */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-primary text-accent">Recent Bookings</h3>
            <a href="/guest/my-bookings" className="text-accent hover:underline text-sm">
              View All
            </a>
          </div>
          
          {recentBookings.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p>No bookings yet. Start exploring hotels!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hotel</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentBookings.map((booking) => {
                    const statusInfo = getStatusBadge(booking.status);
                    return (
                      <tr key={booking._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {booking.hotel?.name || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {booking.room?.type || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(booking.checkIn).toLocaleDateString()} to{' '}
                          {new Date(booking.checkOut).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs ${statusInfo.bg} ${statusInfo.text}`}>
                            {statusInfo.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${booking.totalAmount?.toFixed(2) || '0.00'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Notifications */}
        {notifications.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-primary text-accent">Recent Notifications</h3>
              <a href="/guest/notifications" className="text-accent hover:underline text-sm">
                View All
              </a>
            </div>
            
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div 
                  key={notification._id} 
                  className={`p-4 rounded-lg border ${
                    notification.isRead 
                      ? 'bg-gray-50 border-gray-200' 
                      : 'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{notification.title || notification.message}</p>
                      {notification.description && (
                        <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>
                    {!notification.isRead && (
                      <span className="ml-2 h-2 w-2 rounded-full bg-blue-500"></span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuestDashboard;