import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const Employee = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const value = localStorage.getItem("value") || "";

  const user = localStorage.getItem("email") || "";
  const first_name = user.includes("@") ? user.split("@")[0] : "Guest";

  const [formDataList, setFormDataList] = useState({
    data: [],
    active: 1,
    totalPages: 0,
  });

  const [editFormData, setEditFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  // Fetch employee data
  const fetchData = useCallback(
    async (page) => {
      try {
        const response = await axios.get(`${APIURL}/getEmployeeData`, {
          params: { page: page, pageSize: 5, search: search },
          headers: { Authorization: `Bearer ${token}` },
        });
        localStorage.setItem("value", response.data.totalPages);
        setFormDataList({
          data: response.data.data,
          active: page,
          totalPages: response.data.totalPages,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    [search, token]
  );

  useEffect(() => {
    fetchData(1);
  }, [search, fetchData]);

  // Navigation to create employee
  const handleCreateEmployee = () => {
    navigate("/dashboard/createEmployee");
  };

  // Edit and Save Handlers
  const handleEditClick = (formData) => {
    setEditFormData({ ...formData });
    setIsEditing(true);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-6 ">
      <div className="row">
        {showWelcome && value === "" ? (
          <div className="flex justify-center items-center w-full">
            <Card className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-6">
              <Card.Body className="text-center">
                <Card.Title className="text-2xl font-bold">
                  Welcome, {first_name}!
                </Card.Title>
                <Card.Text>
                  Add a new employee to your team and assign roles.
                </Card.Text>
                <Button
                  className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                  onClick={handleCreateEmployee}
                >
                  Add Employee
                </Button>
              </Card.Body>
            </Card>
          </div>
        ) : (
          <div className="w-full">
            <div className="mb-4 flex justify-between items-center">
              <input
                className="w-full border border-gray-300 p-2 rounded-md"
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                required
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md ml-4"
                onClick={handleCreateEmployee}
              >
                Add Employee
              </button>
            </div>
            <h2 className="text-xl font-semibold mb-4">EMPLOYEE LIST</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">#</th>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Email</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {formDataList.data.length ? (
                    formDataList.data.map((formData, index) => (
                      <tr key={index}>
                        <td className="border px-4 py-2">{index + 1}</td>
                        <td className="border px-4 py-2">{formData.f_Name}</td>
                        <td className="border px-4 py-2">{formData.f_Email}</td>
                        <td className="border px-4 py-2">
                          <button
                            className="text-blue-500 hover:underline mr-2"
                            onClick={() => handleEditClick(formData)}
                          >
                            Edit
                          </button>
                          <button className="text-red-500 hover:underline">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-4">
                        No employees found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Employee;

