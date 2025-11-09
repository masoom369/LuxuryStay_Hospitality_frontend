import { useState, useEffect } from 'react';
import { Calendar, FileText, Star, CreditCard, Bell, MapPin } from 'lucide-react';

const GuestDashboard = () => {
  const [stats, setStats] = useState({
    upcomingBookings: 2,
    totalBookings: 5,
    points: 1250,
    unreadNotifications: 3
  });

  const [recentBookings, setRecentBookings] = useState([
    {
      id: 1,
      hotel: 'Grand Luxury Resort',
      room: 'Deluxe Ocean View',
      checkIn: '2023-12-15',
      checkOut: '2023-12-20',
      status: 'confirmed',
      amount: 2450.00
    },
    {
      id: 2,
      hotel: 'City Center Hotel',
      room: 'Executive Suite',
      checkIn: '2023-11-10',
      checkOut: '2023-11-12',
      status: 'completed',
      amount: 890.00
    }
  ]);

  return (
    <div className="container mx-auto py-14 px-4">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-primary text-accent px-3">Guest Dashboard</h2>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Upcoming Bookings</p>
                <p className="text-2xl font-bold text-accent">{stats.upcomingBookings}</p>
              </div>
              <Calendar className="w-8 h-8 text-accent" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-accent">{stats.totalBookings}</p>
              </div>
              <FileText className="w-8 h-8 text-accent" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Loyalty Points</p>
                <p className="text-2xl font-bold text-accent">{stats.points}</p>
              </div>
              <Star className="w-8 h-8 text-accent" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Notifications</p>
                <p className="text-2xl font-bold text-accent">{stats.unreadNotifications}</p>
              </div>
              <Bell className="w-8 h-8 text-accent" />
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-primary text-accent mb-4">Recent Bookings</h3>
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
                {recentBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.hotel}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.room}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.checkIn} to {booking.checkOut}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        booking.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                        booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${booking.amount}</td>
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

export default GuestDashboard;