import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { Pagination, Card, Button } from "react-bootstrap";
import FormComponent from "./CreateEmployee";
// import { APIURL } from "../../utils/api";
// import Img from "../../assets/images/emp2.svg";
// import Image from "../../assets/images/logo.png";

const Employee = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // localstorage
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("email");
  const value = localStorage.getItem("value");

  // user name for profile display
  let first_name;
  first_name = user.split("@")[0];

  const [formDataList, setFormDataList] = useState({
    data: [],
    active: 1,
    totalPages: 0,
  });

  const [editFormData, setEditFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setCreate] = useState(false);

  // Fetch employee data
  const fetchData = useCallback(
    async (page) => {
      try {
        const response = await axios.get(`${APIURL}/getEmployeeData`, {
          params: { page: page, pageSize: 5, search: search },
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  // handle the pagination
  const handlePageChange = (pageNumber) => {
    setFormDataList((prevState) => ({ ...prevState, active: pageNumber }));
    fetchData(pageNumber);
  };

  // handle the edit
  const handleEditClick = (formData) => {
    setEditFormData({ ...formData });
    setIsEditing(true);
  };

  const handleCreate = () => {
    setCreate(true);
  };

  // handle the delete
  // const handleDeleteClick = async (_id) => {
  //   try {
  //     await axios.delete(`${APIURL}/deleteEmployee`, {
  //       data: { _id },
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     setError("");
  //     enqueueSnackbar("Deleted successfully 🎉", { variant: "success" });
  //     setTimeout(() => {
  //       fetchData(1);
  //     }, 1000);
  //   } catch (error) {
  //     if (error.response && error.response.data) {
  //       setError(error.response.data);
  //     } else {
  //       setError("An error occurred. Please try again.");
  //     }
  //   }
  // };

  // handle the close button in edit
  const handleClose = () => {
    setIsEditing(false);
  };

  // handle the input values change in edit
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  // handle the file change in edit
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log(reader.result);
      setEditFormData({ ...editFormData, f_Image: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // handle the form submit in edit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${APIURL}/editEmployee`,
        { editFormData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setError("");
      enqueueSnackbar("Update Successfully 🎉", { variant: "success" });
      setTimeout(() => {
        setIsEditing(false);
        fetchData(1);
      }, 1000);
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="row">
        {showWelcome && value === "" ? (
          <div className="flex justify-center items-center w-full">
            <Card className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-6">
              <Card.Body className="text-center">
                <Card.Title className="text-2xl font-bold">
                  Welcome, {first_name && first_name}!
                </Card.Title>
                <Card.Text>
                  Add a new employee to your team and assign roles.
                </Card.Text>
                <Button
                  className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                  variant="primary"
                  onClick={() => {
                    navigate(`/create`);
                  }}
                >
                  Add Employee
                </Button>
              </Card.Body>
            </Card>
          </div>
        ) : (
          <div className="w-full">
            <div className="mb-4 flex justify-between items-center">
              <div className="w-full md:w-1/2">
                <input
                  className="w-full border border-gray-300 p-2 rounded-md"
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  className="btn bg-white text-sm border-2 border-gray-300 rounded-md px-4 py-2 mr-4"
                >
                  Count
                  <span className="badge bg-red-500 text-white rounded-full ml-2">
                    {formDataList?.data?.length || 0}
                  </span>
                </button>
                <button
                  className="bg-white text-sm text-blue-500 border-2 border-blue-500 rounded-md px-4 py-2"
                  onClick={handleCreate}
                >
                  <i className="fas fa-plus mr-2"></i> Create
                </button>
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-semibold">EMPLOYEE LIST</h2>
              <div className="overflow-x-auto mt-4">
                <table className="min-w-full table-auto">
                  <thead className="bg-gray-100 text-left">
                    <tr>
                      <th className="px-4 py-2">#</th>
                      <th className="px-4 py-2">Image</th>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Email</th>
                      <th className="px-4 py-2">Mobile</th>
                      <th className="px-4 py-2">Designation</th>
                      <th className="px-4 py-2">Gender</th>
                      <th className="px-4 py-2">Course</th>
                      <th className="px-4 py-2">Join Date</th>
                      <th className="px-4 py-2"></th>
                      <th className="px-4 py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {formDataList.data ? (
                      formDataList.data.map((formData, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-2">{index + 1}</td>
                          <td className="px-4 py-2">
                            <img
                              src={formData.f_Image}
                              alt="User"
                              width="50"
                              className="rounded-full"
                            />
                          </td>
                          <td className="px-4 py-2">{formData.f_Name}</td>
                          <td className="px-4 py-2">{formData.f_Email}</td>
                          <td className="px-4 py-2">{formData.f_Mobile}</td>
                          <td className="px-4 py-2">{formData.f_Designation}</td>
                          <td className="px-4 py-2">{formData.f_gender}</td>
                          <td className="px-4 py-2">{formData.f_Course}</td>
                          <td className="px-4 py-2">{formData.f_Createdate}</td>
                          <td className="px-4 py-2">
                            <i
                              className="fa-regular fa-pen-to-square cursor-pointer"
                              onClick={() => handleEditClick(formData)}
                            ></i>
                          </td>
                          <td className="px-4 py-2">
                            <i
                              className="fa-solid fa-trash cursor-pointer"
                              onClick={() => handleDeleteClick(formData._id)}
                            ></i>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-center py-4 text-red-500">
                          No Data Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <Pagination size="sm" className="mt-4">
                <Pagination.First
                  onClick={() => handlePageChange(1)}
                  disabled={formDataList.active === 1}
                />
                <Pagination.Prev
                  onClick={() => handlePageChange(formDataList.active - 1)}
                  disabled={formDataList.active === 1}
                />
                {[...Array(formDataList.totalPages).keys()].map((pageNumber) => (
                  <Pagination.Item
                    onClick={() => handlePageChange(pageNumber + 1)}
                    key={pageNumber + 1}
                    active={pageNumber + 1 === formDataList.active}
                  >
                    {pageNumber + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => handlePageChange(formDataList.active + 1)}
                  disabled={formDataList.active === formDataList.totalPages}
                />
                <Pagination.Last
                  onClick={() => handlePageChange(formDataList.totalPages)}
                  disabled={formDataList.active === formDataList.totalPages}
                />
              </Pagination>
            </div>

            {/* Edit Modal */}
            {isEditing && (
              <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg w-full md:w-1/2">
                  <div className="flex justify-between items-center">
                    <img src={Img} alt="" width={70} className="rounded" />
                    <i
                      className="fas fa-times cursor-pointer text-red-500"
                      onClick={handleClose}
                    ></i>
                  </div>
                  <h2 className="text-xl font-semibold mt-4">Update Information</h2>
                  <form onSubmit={handleFormSubmit} className="mt-4">
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="mb-4">
                      <label htmlFor="f_Image" className="block text-sm font-semibold">Profile</label>
                      <input
                        type="file"
                        className="w-full border border-gray-300 p-2 rounded-md"
                        id="f_Image"
                        name="f_Image"
                        onChange={handleFileInputChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="f_Name" className="block text-sm font-semibold">Name</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 p-2 rounded-md"
                        id="f_Name"
                        name="f_Name"
                        value={editFormData.f_Name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="f_Email" className="block text-sm font-semibold">Email</label>
                      <input
                        type="email"
                        className="w-full border border-gray-300 p-2 rounded-md"
                        id="f_Email"
                        name="f_Email"
                        value={editFormData.f_Email}
                        onChange={handleInputChange}
                      />
                    </div>
                    {/* Add the rest of the form fields similarly */}
                    <div className="flex justify-end mt-4">
                      <Button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Employee;
