import React, { useState } from "react";
import { Nav, Image } from "react-bootstrap";
import data2 from "../assets/images/data2.png";
import { enqueueSnackbar } from "notistack";
import {
  FaUsers,
  FaClipboardList,
  FaUser,
  FaCalendarAlt,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ toggleSidebar }) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const user = localStorage.getItem("email");
  const first_name = user?.split("@")[0].toUpperCase() || "User";

  const logoutHandle = () => {
    enqueueSnackbar("Logout Successful 🎉", { variant: "success" });
    navigate("/");
  };

  return (
    <div
      className={`flex flex-col bg-gray-100 text-gray-700 h-screen p-3 ${
        expanded
          ? "w-60 transition-width duration-300"
          : "w-20 transition-width duration-500"
      }`}
    >
      {/* User Profile Section */}
      <div className="flex items-center mb-4">
        <Image src={data2} alt="User" className="w-10 h-10 rounded-full" />
        {expanded && (
          <div className="ml-3">
            <h6 className="m-0 text-lg">{first_name}</h6>
            <small className="text-gray-500">Product Manager</small>
          </div>
        )}
      </div>

      {/* Divider */}
      <hr className="border-gray-400 opacity-50 my-4" />

      {/* Main Navigation */}
      <Nav className="flex flex-col">
        <Nav.Link
          onClick={() => navigate("/dashboard/employees")}
          className="flex items-center text-gray-700 py-2 hover:bg-gray-200 rounded-md px-3"
        >
          <FaUsers className="text-xl mr-2" />
          {expanded && <span className="text-base">Employees</span>}
        </Nav.Link>

        <Nav.Link
          onClick={() => navigate("/dashboard/leave")}
          className="flex items-center text-gray-700 py-2 hover:bg-gray-200 rounded-md px-3"
        >
          <FaClipboardList className="text-xl mr-2" />
          {expanded && <span className="text-base">Leave</span>}
        </Nav.Link>

        <Nav.Link
          onClick={() => navigate("/dashboard/profile")}
          className="flex items-center text-gray-700 py-2 hover:bg-gray-200 rounded-md px-3"
        >
          <FaUser className="text-xl mr-2" />
          {expanded && <span className="text-base">Profile</span>}
        </Nav.Link>

        <Nav.Link
          onClick={() => navigate("/dashboard/schedules")}
          className="flex items-center text-gray-700 py-2 hover:bg-gray-200 rounded-md px-3"
        >
          <FaCalendarAlt className="text-xl mr-2" />
          {expanded && <span className="text-base">Schedules</span>}
        </Nav.Link>
      </Nav>

      <hr className="border-gray-400 opacity-50 my-4" />

      {/* Settings and Logout */}
      <Nav className="mt-auto flex flex-col">
        <Nav.Link
          onClick={() => navigate("/dashboard/settings")}
          className="flex items-center text-gray-700 py-2 hover:bg-gray-200 rounded-md px-3"
        >
          <FaCog className="text-xl mr-2" />
          {expanded && <span className="text-base">Settings</span>}
        </Nav.Link>

        <Nav.Link
          className="flex items-center text-red-600 py-2 hover:bg-gray-200 rounded-md px-3"
          onClick={logoutHandle}
        >
          <FaSignOutAlt className="text-xl mr-2" />
          {expanded && <span className="text-base">Logout</span>}
        </Nav.Link>
      </Nav>

      {/* Toggle Sidebar */}
      <div className="flex justify-center mt-3">
        <button
          className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-700"
          onClick={() => {
            setExpanded(!expanded);
          }}
        >
          {expanded ? "<" : ">"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

