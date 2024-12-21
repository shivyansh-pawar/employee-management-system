import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { Pagination, Card, Button } from "react-bootstrap";
import FormComponent from "../CreateEmployee/Create";
import { APIURL } from "../../utils/api";
import Img from "../../assets/images/emp2.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
/* src/styles/bootstrap-only.css */






const Employee = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //localstorage
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("email");
  const value = localStorage.getItem("value");

  //user name for profile display
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
  ); // Include dependencies that affect fetchData

  useEffect(() => {
    fetchData(1);
  }, [search, fetchData]);

  //handle the pagination
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
  const handleDeleteClick = async (_id) => {
    try {
      await axios.delete(`${APIURL}/deleteEmployee`, {
        data: { _id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setError("");
      enqueueSnackbar("Deleted successfully 🎉", { variant: "success" });
      setTimeout(() => {
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

  // handle the close button in edit
  const handleClose = () => {
    setIsEditing(false);
  };

  //handle the input values change in edit
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  //handle the file change in edit
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

  //handle the form submit in edit
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
    <div className="container">
      <div className="row">
        {showWelcome && value === "" ? (
          <div className="notEmployee">
            <Card className="dash1 table_body">
              <Card.Body className="welcomeCard">
                <Card.Title className="fs-1">
                  Welcome, {first_name && first_name}!
                </Card.Title>
                <Card.Text>
                  Add a new employee to your team and assign roles.
                </Card.Text>
                <Button
                
                  className="create_btn2"
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
          <div className="employee">
            <div className="col-12 fs-1">
              <div className="d-flex justify-content-between align-items-center">
                <div className="search-wrapper">
                  <input
                    className="border-1 search fs-6"
                    type="text"
                    placeholder="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="col-12 d-flex justify-content-end mt-4">
              <button
                type="button"
                className="btn bg-white position-relative create_btn me-5"
              >
                Count
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {formDataList?.data?.length || 0}
                  <span className="visually-hidden">unread messages</span>
                </span>
              </button>
              <button
                className="btn create_btn bg-white me-2"
                onClick={handleCreate}
              >
               <FontAwesomeIcon icon={faPlus} className="me-1" /> Create
              </button>
            </div>
            <div className="col-12 mt-2">
              <h2 className="display-6 table_title fw-bolder">EMPLOYEE LIST</h2>
              <div className="table-responsive mt-4">
                <table className="table table-hover">
                  <thead className="logo text-secondary">
                    <tr>
                      <th>#</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Designation</th>
                      <th>Gender</th>
                      <th>Course</th>
                      <th>Join Date</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className="logo">
                    {formDataList.data ? (
                      formDataList.data.map((formData, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <img
                              src={formData.f_Image}
                              alt="User"
                              width="50"
                              className="img-thumbnail"
                            />
                          </td>
                          <td>{formData.f_Name}</td>
                          <td>{formData.f_Email}</td>
                          <td>{formData.f_Mobile}</td>
                          <td>{formData.f_Designation}</td>
                          <td>{formData.f_gender}</td>
                          <td>{formData.f_Course}</td>
                          <td>{formData.f_Createdate}</td>
                          <td>
                            <i
                              className="fa-regular fa-pen-to-square icon_style1"
                              onClick={() => handleEditClick(formData)}
                            ></i>{" "}
                          </td>
                          <td>
                            <i
                              className="fa-solid fa-trash icon_style2"
                              onClick={() => handleDeleteClick(formData._id)}
                            ></i>{" "}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="no-data">
                          No Data Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <Pagination size="sm" className="page">
                <Pagination.First
                  onClick={() => handlePageChange(1)}
                  disabled={formDataList.active === 1}
                />
                <Pagination.Prev
                  onClick={() => handlePageChange(formDataList.active - 1)}
                  disabled={formDataList.active === 1}
                />
                {[...Array(formDataList.totalPages).keys()].map(
                  (pageNumber) => (
                    <Pagination.Item
                      onClick={() => handlePageChange(pageNumber + 1)}
                      key={pageNumber + 1}
                      active={pageNumber + 1 === formDataList.active}
                    >
                      {pageNumber + 1}
                    </Pagination.Item>
                  )
                )}
                <Pagination.Next
                  onClick={() => handlePageChange(formDataList.active + 1)}
                  disabled={formDataList.active === formDataList.totalPages}
                />
                <Pagination.Last
                  onClick={() => handlePageChange(formDataList.totalPages)}
                  disabled={formDataList.active === formDataList.totalPages}
                />
              </Pagination>
              {isEditing && (
                <div className="modal">
                  <div className="modal-content">
                    <div className="card">
                      <div className="card-header text-center head text-white">
                        <img src={Img} alt="" width={70} className="rounded" />
                        <i class="fas fa-times close" onClick={handleClose}></i>
                        <h2 className="fs-4 mt-1 mb-1">Update Information</h2>
                      </div>
                      <div className="card-body">
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <div>
                          <form onSubmit={handleFormSubmit}>
                            <div className="form-group mb-2">
                              <label htmlFor="f_Image" className="font_card">
                                Profile
                              </label>
                              <input
                                type="file"
                                className="form-control"
                                id="f_Image"
                                name="f_Image"
                                onChange={handleFileInputChange}
                              />
                            </div>
                            <div className="form-group mb-2">
                              <label htmlFor="f_Name" className="font_card">
                                Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="f_Name"
                                name="f_Name"
                                value={editFormData.f_Name}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="form-group mb-2">
                              <label htmlFor="f_Email" className="font_card">
                                Email
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                id="f_Email"
                                name="f_Email"
                                value={editFormData.f_Email}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="form-group mb-2">
                              <label htmlFor="f_Mobile" className="font_card">
                                Mobile
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="f_Mobile"
                                name="f_Mobile"
                                value={editFormData.f_Mobile}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="form-group mb-2">
                              <label
                                htmlFor="f_Designation"
                                className="font_card"
                              >
                                Designation
                              </label>
                              <select
                                className="form-control"
                                id="f_Designation"
                                name="f_Designation"
                                value={editFormData.f_Designation}
                                onChange={handleInputChange}
                              >
                                <option value="">Select Designation</option>
                                <option value="HR">HR</option>
                                <option value="Manager">Manager</option>
                                <option value="Sales">Sales</option>
                                <option value="Developer">Developer</option>
                                <option value="Designer">Designer</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Support">Support</option>
                              </select>
                            </div>
                            <div className="form-group mb-2">
                              <label htmlFor="f_gender" className="font_card">
                                Gender
                              </label>
                              <div>
                                <div className="form-check form-check-inline">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="f_gender"
                                    id="male"
                                    value="Male"
                                    onChange={handleInputChange}
                                    checked={editFormData.f_gender === "Male"}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="male"
                                  >
                                    Male
                                  </label>
                                </div>
                                <div className="form-check form-check-inline">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="f_gender"
                                    id="female"
                                    value="Female"
                                    onChange={handleInputChange}
                                    checked={editFormData.f_gender === "Female"}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="female"
                                  >
                                    Female
                                  </label>
                                </div>
                                <div className="form-check form-check-inline">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="f_gender"
                                    id="other"
                                    value="Other"
                                    onChange={handleInputChange}
                                    checked={editFormData.f_gender === "Other"}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="other"
                                  >
                                    Other
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div className="form-group mb-2">
                              <label htmlFor="f_Course" className="font_card">
                                Course
                              </label>
                              <select
                                className="form-control"
                                id="f_Course"
                                name="f_Course"
                                value={editFormData.f_Course}
                                onChange={handleInputChange}
                              >
                                <option value="">Select a course</option>
                                <option value="MCA">MCA</option>
                                <option value="BCA">BCA</option>
                                <option value="BSC">BSC</option>
                                <option value="BTECH">B-TECH</option>
                                <option value="MBA">MBA</option>
                                <option value="MSC">MSC</option>
                                <option value="MTECH">M-TECH</option>
                                <option value="BA">BA</option>
                                <option value="MA">MA</option>
                                <option value="PHD">PhD</option>
                                <option value="DIPLOMA">Diploma</option>
                              </select>
                            </div>
                            <div className="form-group mb-2">
                              <label
                                htmlFor="f_Createdate"
                                className="font_card"
                              >
                                Join Date
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                id="f_Createdate"
                                name="f_Createdate"
                                value={editFormData.f_Createdate}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="d-flex justify-content-center">
                              <button
                                type="submit"
                                className="btn btn-primary mt-2"
                              >
                                Update
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {isCreating && (
                <div className="modal">
                  <div className="modal-content">
                    <FormComponent
                      setCreate={setCreate}
                      fetchData={fetchData}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Employee;
