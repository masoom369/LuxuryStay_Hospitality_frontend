import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { name: "User Management", path: "/admin/users" },
    { name: "Hotel Management", path: "/admin/hotels" },
    { name: "Rooms Management", path: "/admin/rooms" },
  ];

  return (
    <div className="w-60 h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-lg font-semibold">Admin Panel</h1>
      </div>

      <nav className="flex flex-col mt-4">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`p-3 text-sm ${
              location.pathname === link.path
                ? "bg-gray-600 font-medium"
                : "hover:bg-gray-700"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
