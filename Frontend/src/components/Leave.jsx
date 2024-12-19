import React, { useState, useEffect } from "react";
import { FaCheck, FaTimes, FaAngleDown } from "react-icons/fa";

const AttendanceLeavePage = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [selectedOption, setSelectedOption] = useState("attendance");

  useEffect(() => {
    setAttendanceData([
      { id: 1, name: "John Doe", date: "2024-09-25", status: "Present" },
      { id: 2, name: "Jane Smith", date: "2024-09-25", status: "Absent" },
    ]);
    setLeaveRequests([
      {
        id: 1,
        name: "John Doe",
        type: "Sick Leave",
        from: "2024-09-28",
        to: "2024-09-29",
        status: "Pending",
      },
      {
        id: 2,
        name: "Jane Smith",
        type: "Annual Leave",
        from: "2024-10-05",
        to: "2024-10-10",
        status: "Approved",
      },
    ]);
  }, []);

  const handleLeaveApproval = (requestId, newStatus) => {
    setLeaveRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === requestId ? { ...request, status: newStatus } : request
      )
    );
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-100 to-purple-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Attendance & Leave Management
        </h1>
        <div className="flex items-center gap-4">
          <label
            htmlFor="attendance-leave-dropdown"
            className="text-gray-700 font-medium"
          >
            Select View:
          </label>
          <div className="relative">
            <select
              id="attendance-leave-dropdown"
              className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="attendance">Attendance</option>
              <option value="leave">Leave</option>
            </select>
            <FaAngleDown className="absolute top-2/4 right-3 transform -translate-y-2/4 text-gray-500" />
          </div>
        </div>
      </header>

      <div className="bg-white shadow-md rounded p-6">
        {selectedOption === "attendance" ? (
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Attendance Records
            </h2>
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-600 font-medium">
                      Employee Name
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-600 font-medium">
                      Date
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-600 font-medium">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.map((entry) => (
                    <tr key={entry.id} className="odd:bg-white even:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">
                        {entry.name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {entry.date}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <span
                          className={`inline-block px-3 py-1 text-sm font-medium rounded ${
                            entry.status === "Present"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {entry.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : (
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Leave Requests
            </h2>
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-600 font-medium">
                      Employee Name
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-600 font-medium">
                      Leave Type
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-600 font-medium">
                      From
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-600 font-medium">
                      To
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-600 font-medium">
                      Status
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-600 font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests.map((request) => (
                    <tr
                      key={request.id}
                      className="odd:bg-white even:bg-gray-50"
                    >
                      <td className="border border-gray-300 px-4 py-2">
                        {request.name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {request.type}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {request.from}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {request.to}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <span
                          className={`inline-block px-3 py-1 text-sm font-medium rounded ${
                            request.status === "Approved"
                              ? "bg-green-100 text-green-800"
                              : request.status === "Rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {request.status}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {request.status === "Pending" ? (
                          <div className="flex gap-2">
                            <button
                              className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                              onClick={() =>
                                handleLeaveApproval(request.id, "Approved")
                              }
                            >
                              <FaCheck /> Approve
                            </button>
                            <button
                              className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                              onClick={() =>
                                handleLeaveApproval(request.id, "Rejected")
                              }
                            >
                              <FaTimes /> Reject
                            </button>
                          </div>
                        ) : (
                          request.status
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default AttendanceLeavePage;
