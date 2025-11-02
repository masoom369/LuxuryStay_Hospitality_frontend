import { Link, useNavigate } from 'react-router-dom';
import { BsDoorOpen, BsBoxArrowRight, BsList } from 'react-icons/bs';
import { useState } from 'react';

const Header = ({ onToggleSidebar, logout }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-40 w-full">
      <div className="flex items-center justify-between p-4 w-full">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
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
            onClick={() => {
              logout();
              navigate('/admin/dashboard');
            }}
            className="text-gray-600 hover:text-gray-900 flex items-center gap-1"
          >
            <BsBoxArrowRight className="w-5 h-5" /> Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
