import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Navbar";

const Dashboard = () => {
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case "/dashboard/employees":
        return <Employee />;
      case "/dashboard/leave":
        return <Leave />;
      case "/dashboard/profile":
        return <Profile />;
      case "/dashboard/createEmployee":
        return <CreateEmployee />;
      default:
        return <h1 className="text-center text-xl">Welcome to the Dashboard!</h1>;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="sidebar-style">
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

