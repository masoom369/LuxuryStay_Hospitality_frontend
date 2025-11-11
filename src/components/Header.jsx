import { useAuth } from "../context";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [header, setHeader] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () =>
      window.scrollY > 50 ? setHeader(true) : setHeader(false)
    );
  });

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/hotels" },
    // { name: "About", path: "/about-us" },
    { name: "Contact", path: "/contact-us" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header
      className={`fixed z-50 w-full transition-all duration-300
      ${header ? "bg-white py-6 shadow-lg" : "bg-transparent py-8"}`}
    >
      <div className="container mx-auto flex flex-col lg:flex-row items-center lg:justify-between gap-y-6 lg:gap-y-0">
        {/* Logo Text */}
        <Link to="/" className="text-center">
          <div className={`font-primary ${header ? "text-gray-900" : "text-white"} text-lg md:text-xl`}>
            <span className="block text-lg md:text-xl tracking-widest">LuxuryStay</span>
            <span className="block text-sm md:text-base mt-[-0.3rem]">Hospitality</span>
          </div>
        </Link>

        {/* Nav */}
        <nav
          className={`${header ? "text-primary" : "text-white"}
        flex gap-x-4 lg:gap-x-8 font-tertiary tracking-[3px] text-[15px] items-center uppercase`}
        >
          {navLinks.map((link) => (
            <Link
              to={link.path}
              className="transition hover:text-accent"
              key={link.name}
            >
              {link.name}
            </Link>
          ))}
          {/* Auth Links */}
          {user ? (
            <>
              <Link to="/dashboard" className="transition hover:text-accent">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="transition hover:text-accent"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="transition hover:text-accent">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
