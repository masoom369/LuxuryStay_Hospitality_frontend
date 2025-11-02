import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import ManagerSidebar from "../components/manager/ManagerSidebar";
import ManagerHeader from "../components/manager/ManagerHeader";
import ManagerFooter from "../components/manager/ManagerFooter";

const ManagerLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <ManagerSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Section */}
      <div
        className={`flex flex-col flex-1 bg-[#f3ede7] transition-all duration-300 ${
          collapsed ? "ml-20" : "ml-64"
        }`}
      >
        <ManagerHeader />

        {/* Scrollable main content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

        {/* Fixed footer (sticks at bottom) */}
        <ManagerFooter />
      </div>
    </div>
  );
};

export default ManagerLayout;
