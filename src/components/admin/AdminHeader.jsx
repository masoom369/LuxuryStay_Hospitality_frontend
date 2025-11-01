// src/components/admin/AdminHeader.jsx
import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context";

const AdminHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // existing logout logic
    navigate("/login");
  };

  return (
    <header className="bg-[#f3ede7] border-b border-[#d8c8b5] h-16 flex items-center justify-between px-6">
      {/* Left: Title */}
      <h1
        className="text-lg font-semibold text-[#4a3424] cursor-pointer hover:text-[#8c755c]"
        onClick={() => navigate("/admin")}
      >
        Admin Dashboard
      </h1>

      {/* Right: User info */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/admin/account")}
          className="flex items-center gap-2 text-[#4a3424] font-medium hover:text-[#8c755c]"
        >
          <User size={18} />
          <span>{user?.name || "Admin"}</span>
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-[#5a422d] text-white px-3 py-1 rounded hover:bg-[#c6a16e] hover:text-[#2e1d0e] transition"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
