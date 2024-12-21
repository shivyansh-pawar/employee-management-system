import React, { useState } from "react";
import axios from "axios";
import { APIURL } from '../utils/api';
import { enqueueSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';



const SignIn = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${APIURL}/login`, {
        password,
        email,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      enqueueSnackbar("Login Successful 🎉", { variant: "success" });
      navigate(`/getEmployeeData/employees`);
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.error || "An error occurred";
        console.log("errorMessage: ", errorMessage);
        setError(errorMessage);
        enqueueSnackbar(errorMessage, { variant: "error" });
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen  bg-gradient-to-br from-blue-100 to-purple-50 ">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl">
        {/* Left Image Section */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 p-6">
        <DotLottieReact
      src="https://lottie.host/0aeed002-8e03-4c0f-9608-46d93db8848e/bklHMDsE2z.lottie"
      loop
      autoplay
    />{/* <img src={card} alt="Card Illustration" className="w-3/4" /> */}
        </div>

        {/* Signup Form Section */}
        <div className="p-8">
          <div className="text-center mb-6">
          <DotLottieReact
      src="https://lottie.host/9777f2b0-c918-4fb1-81bc-037a96892880/43ZYN4SUnq.lottie"
      loop
      autoplay
    />
            {/* <img src={Logo} alt="Logo" className="w-24 mx-auto mb-4" /> */}
            <h1 className="text-2xl font-bold text-gray-800">
              <span className="text-blue-500">Welcome</span> Back
            </h1>
            <p className="text-gray-600 font-semibold">Please Login to access your account</p>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your username"
                className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
           
            
            <div>
              <label htmlFor="password" className="block text-sm text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
            >
             Login
            </button>
          </form>
          <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
                 Already have an account?{" "}
                 <Link to="/signup" className="text-blue-500 hover:underline font-medium">
                   Sign'up
                 </Link>
                 </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
