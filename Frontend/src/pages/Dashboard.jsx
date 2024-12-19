import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Navbar";

const Dashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-[250px] md:w-[200px]">
        <Sidebar />
      </div>

      {/* Dashboard Content */}
      <div className="flex-grow overflow-y-auto p-4 md:p-10 lg:p-15">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
