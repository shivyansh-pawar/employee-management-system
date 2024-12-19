import React, { useState } from "react";
import axios from "axios";
import { APIURL } from "../utils/api";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import card from "../assets/images/sign2.png";
import Logo from "../assets/images/logo.avif";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [err, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_-]{2,15}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const mobileRegex = /^\d{10}$/;

    if (!usernameRegex.test(username)) {
      enqueueSnackbar("Invalid username.", { variant: "warning" });
      return;
    }

    if (!mobileRegex.test(mobile)) {
      enqueueSnackbar("Invalid mobile number.", { variant: "warning" });
      return;
    }

    if (!passwordRegex.test(password)) {
      enqueueSnackbar("Invalid password.", { variant: "warning" });
      return;
    }

    try {
      await axios.post(`${APIURL}/signup`, {
        username,
        password,
        email,
        mobileNumber: mobile,
      });
      setError("");
      enqueueSnackbar("Account Created Successfully 🎉", { variant: "success" });
      navigate(`/`);
    } catch (error) {
      const errorMessage = error.response?.data?.error || "An error occurred";
      setError(errorMessage);
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl">
        {/* Left Section - Image */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
          <img src={card} alt="Card" className="w-3/4" />
        </div>

        {/* Right Section - Form */}
        <div className="p-8 w-full">
          <div className="text-center mb-6">
            <img src={Logo} alt="Logo" className="w-20 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800">
              Create <span className="text-blue-500">Account</span>
            </h1>
            <p className="text-gray-600">Unlock endless possibilities today!</p>
          </div>

          {err && <p className="text-red-500 text-sm mb-4">{err}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600">Name</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600">Contact Number</label>
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter your mobile number"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/" className="text-blue-500 hover:underline font-medium">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
