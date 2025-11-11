import { Link, useNavigate } from 'react-router-dom';
import { DoorOpen, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';

const Header = ({ onToggleSidebar, logout }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-40 w-full">
      <div className="container mx-auto py-4 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleSidebar}
              className="text-gray-700 hover:text-accent font-secondary"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-accent font-secondary flex items-center gap-1"
            >
              <DoorOpen className="w-5 h-5" /> Public Site
            </Link>
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="text-gray-700 hover:text-accent font-secondary flex items-center gap-1"
            >
              <LogOut className="w-5 h-5" /> Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
