import { useEffect, useState } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();

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
    <div className="min-h-screen bg-gray-50 flex overflow-x-hidden w-full">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} logout={logout} />
      <div className="flex-1 flex flex-col w-full">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} logout={logout} />
        <main className="flex-1 w-full"><Outlet /></main>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
