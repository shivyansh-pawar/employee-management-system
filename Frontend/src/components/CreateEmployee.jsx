import React, { useState } from "react";
import axios from "axios";
import { APIURL } from "../utils/api";
import Img from "../assets/images/emp1.svg";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const FormComponent = ({ setCreate, fetchData }) => {
  const token = localStorage.getItem("token");
  const today = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    f_Name: "",
    f_Email: "",
    f_Mobile: "",
    f_Designation: "",
    f_gender: "",
    f_Course: "",
    f_Createdate: "",
    f_Image: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name } = e.target;
    if (e.target.type === "file") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          [name]: reader.result,
        });
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\d{10}$/;

    if (!nameRegex.test(formData.f_Name)) {
      enqueueSnackbar("Name must contain only letters and spaces.", {
        variant: "warning",
      });
      return;
    }

    if (!emailRegex.test(formData.f_Email)) {
      enqueueSnackbar("Please enter a valid email address.", {
        variant: "warning",
      });
      return;
    }

    if (!mobileRegex.test(formData.f_Mobile)) {
      enqueueSnackbar("Please enter a valid 10-digit mobile number.", {
        variant: "warning",
      });
      return;
    }

    if (!formData.f_Designation) {
      enqueueSnackbar("Please select a designation.", { variant: "warning" });
      return;
    }

    if (!formData.f_gender) {
      enqueueSnackbar("Please select a gender.", { variant: "warning" });
      return;
    }

    if (!formData.f_Image) {
      enqueueSnackbar("Please select a Profile Photo.", { variant: "warning" });
      return;
    }

    if (!formData.f_Course) {
      enqueueSnackbar("Please select a course.", { variant: "warning" });
      return;
    }

    if (!formData.f_Createdate) {
      enqueueSnackbar("Please select a join date.", { variant: "warning" });
      return;
    }

    setError("");

    try {
      await axios.post(
        `${APIURL}/createEmployee`,
        { formData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setError("");
      setCreate(false);
      navigate("/getEmployeeData/employees");
      fetchData(1);
      enqueueSnackbar("Employee created successfully.", { variant: "success" });
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.error || "An error occurred";
        enqueueSnackbar(`${errorMessage}`, { variant: "error" });
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <div className="text-center">
          <img
            src={Img}
            alt="Create Employee"
            className="w-24 h-24  mx-auto "
          />
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={() => setCreate(false)}
          >
            <i className="fas fa-times"></i>
          </button>
          <h2 className="text-2xl font-semibold mt-2">Create Employee</h2>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium" htmlFor="f_Name">
              Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              id="f_Name"
              name="f_Name"
              value={formData.f_Name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="f_Email">
              Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              id="f_Email"
              name="f_Email"
              value={formData.f_Email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="f_Mobile">
              Mobile
            </label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              id="f_Mobile"
              name="f_Mobile"
              value={formData.f_Mobile}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="f_Designation">
              Designation
            </label>
            <select
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              id="f_Designation"
              name="f_Designation"
              value={formData.f_Designation}
              onChange={handleChange}
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
          <div>
            <label className="block text-sm font-medium">Gender</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="f_gender"
                  value="Male"
                  onChange={handleChange}
                  checked={formData.f_gender === "Male"}
                />
                <span className="ml-2">Male</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="f_gender"
                  value="Female"
                  onChange={handleChange}
                  checked={formData.f_gender === "Female"}
                />
                <span className="ml-2">Female</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="f_gender"
                  value="Other"
                  onChange={handleChange}
                  checked={formData.f_gender === "Other"}
                />
                <span className="ml-2">Other</span>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="f_Course">
              Course
            </label>
            <select
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              id="f_Course"
              name="f_Course"
              value={formData.f_Course}
              onChange={handleChange}
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
          <div>
            <label className="block text-sm font-medium" htmlFor="f_Createdate">
              Join Date
            </label>
            <input
              type="date"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              id="f_Createdate"
              name="f_Createdate"
              value={formData.f_Createdate}
              onChange={handleChange}
              min={today}
            />
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="f_Image">
              Image
            </label>
            <input
              type="file"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              id="f_Image"
              name="f_Image"
              accept=".png"
              onChange={handleChange}
            />
            {formData.f_Image && (
              <div className="mt-4">
                <p className="text-sm text-gray-500">Preview:</p>
                <img
                  src={formData.f_Image}
                  alt="Preview"
                  className="w-32 h-32 rounded-md object-cover"
                />
              </div>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormComponent;
