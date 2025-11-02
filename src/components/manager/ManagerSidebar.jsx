import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  BarChart3,
  Menu,
  X,
} from "lucide-react";

const ManagerSidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/manager/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Bookings", path: "/manager/bookings", icon: <CalendarDays size={18} /> },
    { name: "Staff", path: "/manager/staff", icon: <Users size={18} /> },
    { name: "Reports", path: "/manager/reports", icon: <BarChart3 size={18} /> },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen flex flex-col bg-[#4a3424] text-[#f9fafb] border-r border-[#3a291b] transition-all duration-300 z-50 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#8c755c]">
        {!collapsed && (
          <h1 className="text-lg font-bold tracking-wide text-[#f9fafb]">
            Manager
          </h1>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-[#f9fafb] hover:text-[#c6a16e] transition"
        >
          {collapsed ? <Menu size={22} /> : <X size={22} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-4 overflow-y-auto scrollbar-hide">
        {links.map((link) => {
          const active = location.pathname === link.path;
          return (
            <div key={link.name} className="relative group">
              <Link
                to={link.path}
                className={`flex items-center gap-3 p-3 rounded-md mx-3 my-1 transition-all duration-200 ${
                  active
                    ? "bg-[#3a291b] border-l-4 border-[#c6a16e] text-[#f8ead2] font-semibold shadow-inner"
                    : "text-[#f9fafb] hover:bg-[#5a3f2a] hover:border-l-4 hover:border-[#c6a16e] hover:text-[#f8ead2]"
                }`}
              >
                <span className="flex items-center justify-center w-6">{link.icon}</span>
                {!collapsed && <span className="text-sm">{link.name}</span>}
              </Link>

              {/* Tooltip (visible only when collapsed) */}
              {collapsed && (
                <span className="absolute left-20 top-2 bg-[#3a291b] text-[#f9fafb] text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-200">
                  {link.name}
                </span>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="py-6 mt-auto border-t border-[#8c755c] text-xs text-[#e7d8c3]">
        {!collapsed ? (
          <p className="text-center">© 2025 LuxuryStay</p>
        ) : (
          <p className="text-center text-[#c6a16e] text-lg">🏨</p>
        )}
      </div>
    </aside>
  );
};

export default ManagerSidebar;
