import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Navbar";

// Components for different dashboard views
import Leave from "../components/Leave";
import Profile from "../components/Profile";
import CreateEmployee from "../components/CreateEmployee";
import Employee from "../components/Employees";

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
    <div className="flex h-screen overflow-hidden bg-gradient-to-r from-blue-100 to-purple-50">
      {/* Sidebar */}
      <div className="w-[250px] md:w-[200px]">
        <Sidebar />
      </div>

      {/* Dashboard Content */}
      <div className="flex-grow overflow-y-auto p-4 md:p-10 lg:p-15">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;

