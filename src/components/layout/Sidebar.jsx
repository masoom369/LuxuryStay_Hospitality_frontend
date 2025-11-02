import { Link, useNavigate } from 'react-router-dom';
import { BsGraphUp, BsDoorOpen, BsBoxArrowRight, BsPeople, BsBuilding, BsHouseDoor } from 'react-icons/bs';

const Sidebar = ({ sidebarOpen, setSidebarOpen, logout }) => {
  const navigate = useNavigate();

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-white shadow-lg transition-all duration-300 flex flex-col
        ${sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'}`}
      >
        <div className={`${sidebarOpen ? 'block' : 'hidden'} h-full flex flex-col w-64`}>
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="font-primary text-lg text-accent">Hotel Adina</h2>
          </div>

          <nav className="flex-1 mt-6 px-3">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-3 px-3 py-3 text-gray-700 rounded-lg hover:bg-accent/10 hover:text-accent transition-colors font-secondary"
                >
                  <BsGraphUp className="w-5 h-5 flex-shrink-0" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/users"
                  className="flex items-center gap-3 px-3 py-3 text-gray-700 rounded-lg hover:bg-accent/10 hover:text-accent transition-colors font-secondary"
                >
                  <BsPeople className="w-5 h-5 flex-shrink-0" />
                  <span>User Management</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/hotels"
                  className="flex items-center gap-3 px-3 py-3 text-gray-700 rounded-lg hover:bg-accent/10 hover:text-accent transition-colors font-secondary"
                >
                  <BsBuilding className="w-5 h-5 flex-shrink-0" />
                  <span>Hotel Management</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/rooms"
                  className="flex items-center gap-3 px-3 py-3 text-gray-700 rounded-lg hover:bg-accent/10 hover:text-accent transition-colors font-secondary"
                >
                  <BsHouseDoor className="w-5 h-5 flex-shrink-0" />
                  <span>Rooms Management</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-3 px-3 py-3 text-gray-700 rounded-lg hover:bg-accent/10 hover:text-accent transition-colors font-secondary"
                >
                  <BsDoorOpen className="w-5 h-5 flex-shrink-0" />
                  <span>Public Site</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    logout();
                    navigate('/admin/dashboard');
                  }}
                  className="w-full flex items-center gap-3 px-3 py-3 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors font-secondary"
                >
                  <BsBoxArrowRight className="w-5 h-5 flex-shrink-0" />
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
