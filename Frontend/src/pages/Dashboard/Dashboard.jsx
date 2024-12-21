import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Navbar/Navbar";
import './Dashboard.css'
import './Dashboard2.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar-style">
        <Sidebar />
      </div>

      {/* Dashboard Content */}
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
