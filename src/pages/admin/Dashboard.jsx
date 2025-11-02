import { useEffect, useState } from 'react';
import { useRoomContext, useAuth } from '../../context';
import { Link, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  BsCalendar,
  BsDoorOpen,
  BsPeople,
  BsGraphUp,
} from 'react-icons/bs';

const mockRevenue = [
  { day: 'Mon', amount: 2450 },
  { day: 'Tue', amount: 3100 },
  { day: 'Wed', amount: 2800 },
  { day: 'Thu', amount: 3550 },
  { day: 'Fri', amount: 4200 },
  { day: 'Sat', amount: 5100 },
  { day: 'Sun', amount: 4800 },
];

const Dashboard = () => {
  const { rooms } = useRoomContext();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const totalRooms = rooms.length;
  const occupied = rooms.filter(r => r.maxOccupancy > 0).length;
  const occupancy = totalRooms ? ((occupied / totalRooms) * 100).toFixed(1) : 0;

  const recentBookings = [
    { id: 101, guest: 'John Doe', room: 'Deluxe Suite', checkin: 'Oct 30' },
    { id: 102, guest: 'Jane Smith', room: 'Standard', checkin: 'Oct 31' },
    { id: 103, guest: 'Mike Lee', room: 'Family Room', checkin: 'Nov 1' },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 📤 Export Report Function (CSV)
  const handleExportReport = () => {
    const reportData = [
      ['Dashboard Report'],
      ['Generated On:', new Date().toLocaleString()],
      [],
      ['Total Rooms', totalRooms],
      ['Occupancy (%)', occupancy],
      [],
      ['Recent Bookings:'],
      ['ID', 'Guest', 'Room', 'Check-in'],
      ...recentBookings.map(b => [b.id, b.guest, b.room, b.checkin]),
      [],
      ['Revenue (Last 7 Days):'],
      ['Day', 'Amount ($)'],
      ...mockRevenue.map(r => [r.day, r.amount]),
    ];

    const csvContent = reportData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'dashboard_report.csv';
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                <BsDoorOpen className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Rooms</p>
                <p className="text-2xl font-bold">{totalRooms}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                <BsPeople className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Occupancy</p>
                <p className="text-2xl font-bold">{occupancy}%</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                <BsCalendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Check-ins Today</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                <BsGraphUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Revenue (7d)</p>
                <p className="text-2xl font-bold">$28,500</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Revenue – Last 7 Days</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
              <ul className="space-y-3">
                {recentBookings.map(b => (
                  <li key={b.id} className="flex justify-between text-sm">
                    <span className="font-medium">{b.guest}</span>
                    <span className="text-gray-600">{b.room} – {b.checkin}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              View Public Site
            </Link>
            <button
              onClick={handleExportReport}
              className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Export Report
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
