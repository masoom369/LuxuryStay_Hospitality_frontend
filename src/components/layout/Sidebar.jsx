import { Link, useNavigate } from 'react-router-dom';
import { TrendingUp, DoorOpen, LogOut, Users, Building, Home, Calendar, FileText, Star, Bell, CreditCard, UserPlus, UserCheck, Clock, Wrench, Mail, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ sidebarOpen, setSidebarOpen, logout }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { role } = user || {};

  const roleLinks = {
    admin: [
      { path: "/admin/dashboard", label: "Dashboard", icon: TrendingUp },
      { path: "/admin/users", label: "User Management", icon: Users },
      { path: "/admin/hotels", label: "Hotel Management", icon: Building },
      { path: "/admin/rooms", label: "Rooms Management", icon: Home },
      { path: "/admin/contact", label: "Contact Messages", icon: Mail }
    ],
    manager: [
      { path: "/admin/dashboard", label: "Dashboard", icon: TrendingUp },
      { path: "/manager/reporting", label: "Reporting", icon: TrendingUp },
      { path: "/manager/occupancy", label: "Occupancy Reports", icon: Home },
      { path: "/manager/revenue", label: "Revenue Reports", icon: CreditCard },
      { path: "/manager/performance", label: "Performance", icon: TrendingUp },
      { path: "/manager/feedback-management", label: "Feedback Management", icon: Star }
    ],
    receptionist: [
      { path: "/receptionist/create-guest", label: "Create Guest Account", icon: UserPlus },
      { path: "/receptionist/walk-in", label: "Walk-in Booking", icon: UserCheck },
      { path: "/receptionist/room-availability", label: "Room Availability", icon: Home }
    ],
    housekeeping: [
      { path: "/housekeeping/dashboard", label: "Dashboard", icon: TrendingUp },
      { path: "/housekeeping/tasks", label: "My Tasks", icon: Clock }
    ],
    maintenance: [
      { path: "/maintenance/dashboard", label: "Dashboard", icon: TrendingUp },
      { path: "/maintenance/issues", label: "My Issues", icon: Wrench }
    ],
    guest: [
      { path: "/guest/dashboard", label: "Dashboard", icon: TrendingUp },
      { path: "/guest/my-bookings", label: "My Bookings", icon: Calendar },
      { path: "/guest/booking-history", label: "Booking History", icon: FileText },
      { path: "/guest/service-requests", label: "Service Requests", icon: Bell },
      { path: "/guest/room-service", label: "In-Room Services", icon: CreditCard },
      { path: "/guest/feedback", label: "Feedback", icon: Star }
    ]
  };

  const links = role && roleLinks[role] ? roleLinks[role] : [];

  return (
    <>
      {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 bg-white shadow-lg transition-all duration-300 flex flex-col ${sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'}`}>
        <div className={`${sidebarOpen ? 'block' : 'hidden'} h-full flex flex-col w-64`}>
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="font-primary text-lg text-accent">LuxuryStay Hospitality</h2>
          </div>
          <nav className="flex-1 mt-6 px-3">
            <ul className="space-y-2">
              {links.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="flex items-center gap-3 px-3 py-3 text-gray-700 rounded-lg hover:bg-accent/10 hover:text-accent transition-colors font-secondary">
                    <link.icon className="w-5 h-5 flex-shrink-0" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/" className="flex items-center gap-3 px-3 py-3 text-gray-700 rounded-lg hover:bg-accent/10 hover:text-accent transition-colors font-secondary">
                  <DoorOpen className="w-5 h-5 flex-shrink-0" />
                  <span>Public Site</span>
                </Link>
              </li>
              <li>
                <Link to="/account" className="flex items-center gap-3 px-3 py-3 text-gray-700 rounded-lg hover:bg-accent/10 hover:text-accent transition-colors font-secondary">
                  <User className="w-5 h-5 flex-shrink-0" />
                  <span>My Account</span>
                </Link>
              </li>
              <li>
                <button onClick={() => { logout(); navigate('/'); }} className="w-full flex items-center gap-3 px-3 py-3 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors font-secondary">
                  <LogOut className="w-5 h-5 flex-shrink-0" />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
