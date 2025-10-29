import { useEffect, useState } from 'react';
import { useRoomContext, useAuth } from '../context';
import { Link, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  BsCalendar,
  BsDoorOpen,
  BsPeople,
  BsGraphUp,
  BsBoxArrowRight,
  BsList,
  BsX
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

  // Sidebar state - closed by default on mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Dashboard data
  const totalRooms = rooms.length;
  const occupied = rooms.filter(r => r.maxOccupancy > 0).length;
  const occupancy = totalRooms ? ((occupied / totalRooms) * 100).toFixed(1) : 0;
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  // Set sidebar open by default on desktop
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

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-white shadow-lg transition-all duration-300 flex flex-col
          ${sidebarOpen ? 'w-64' : 'w-0'}`}
      >
        <div className={`${sidebarOpen ? 'block' : 'hidden'} h-full flex flex-col w-64`}>
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="font-bold text-lg text-gray-800">
              Hotel Adina
            </h2>
          </div>

          {/* Navigation */}
          <nav className="flex-1 mt-6 px-3">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-3 px-3 py-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                >
                  <BsGraphUp className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-3 px-3 py-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                >
                  <BsDoorOpen className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">Public Site</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    logout();
                    navigate('/admin/dashboard');
                  }}
                  className="w-full flex items-center gap-3 px-3 py-3 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <BsBoxArrowRight className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">Logout</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-40">
          <div className="flex items-center justify-between p-4 max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-3">
              {/* Toggle Button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-600 hover:text-gray-900"
              >
               <BsList className="w-6 h-6" />
              </button>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-900 flex items-center gap-1"
              >
                <BsDoorOpen className="w-5 h-5" /> Public Site
              </Link>
              <button
                onClick={() => { logout(); navigate('/admin/dashboard'); }}
                className="text-gray-600 hover:text-gray-900 flex items-center gap-1"
              >
                <BsBoxArrowRight className="w-5 h-5" /> Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">

          {/* Stats Cards */}
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

          {/* Charts + Recent Bookings */}
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
                {[
                  { id: 101, guest: 'John Doe', room: 'Deluxe Suite', checkin: 'Oct 30' },
                  { id: 102, guest: 'Jane Smith', room: 'Standard', checkin: 'Oct 31' },
                  { id: 103, guest: 'Mike Lee', room: 'Family Room', checkin: 'Nov 1' },
                ].map(b => (
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
            <button className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
              Export Report
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;