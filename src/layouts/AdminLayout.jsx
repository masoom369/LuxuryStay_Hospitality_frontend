import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Users, Building2, BedDouble, Home } from "lucide-react";
import Header from "../components/admin/AdminHeader";
import Footer from "../components/admin/AdminFooter";

const AdminLayout = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { name: "User Management", path: "/admin/users", icon: <Users size={18} /> },
    { name: "Hotel Management", path: "/admin/hotels", icon: <Building2 size={18} /> },
    { name: "Rooms Management", path: "/admin/rooms", icon: <BedDouble size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#f7f4f1]">
      {/* Sidebar */}
      <aside
        className={`${
          open ? "w-64" : "w-20"
        } bg-[#5a422d] text-white flex flex-col transition-all duration-300`}
      >
        <div className="flex justify-between items-center p-4 border-b border-[#8c755c]">
          {/* Clickable Admin title */}
          <Link
            to="/admin"
            className={`${!open && "hidden"} text-lg font-semibold hover:text-[#c6a16e]`}
          >
            Admin
          </Link>
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex flex-col mt-6 space-y-1">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center gap-3 p-3 mx-2 rounded-md text-sm font-medium transition 
                ${
                  location.pathname === link.path
                    ? "bg-[#c6a16e] text-[#2e1d0e]"
                    : "hover:bg-[#c6a16e]/40"
                }`}
            >
              {link.icon}
              <span className={`${!open && "hidden"}`}>{link.name}</span>
            </Link>
          ))}

          {/* Public Site Link */}
          <Link
            to="/"
            className="flex items-center gap-3 p-3 mx-2 mt-4 rounded-md text-sm font-medium hover:bg-[#c6a16e]/40"
          >
            <Home size={18} />
            <span className={`${!open && "hidden"}`}>View Public Site</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
