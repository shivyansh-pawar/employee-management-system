import React, { useState } from "react";
import axios from "axios";
import { APIURL } from "../utils/api";
import { enqueueSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';



const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [err, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_-]{2,15}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
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
      enqueueSnackbar("Account Created Successfully 🎉", {
        variant: "success",
      });
      navigate(`/`);
    } catch (error) {
      const errorMessage = error.response?.data?.error || "An error occurred";
      setError(errorMessage);
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  return (
   <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-50 ">
         <div className="grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl">
           {/* Left Image Section */}
           <div className="hidden md:flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 p-6">
           <DotLottieReact
         src="https://lottie.host/81a0b171-7d32-4d29-bf4a-169a885c2731/EJrmUaQj3N.lottie"
         loop
         autoplay
       /> {/* <img src={card} alt="Card Illustration" className="w-3/4" /> */}
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
                 <span className="text-blue-500">Create</span> Account
               </h1>
               <p className="text-gray-600 font-semibold">Unlock endless possibilities today!</p>
             </div>
             {err && <p className="text-red-500 text-sm mb-4">{err}</p>}
             <form onSubmit={handleSubmit} className="space-y-4">
               <div>
                 <label htmlFor="username" className="block text-sm text-gray-600">
                   Name
                 </label>
                 <input
                   type="text"
                   id="username"
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}
                   required
                   placeholder="Enter your username"
                   className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
                 />
               </div>
               <div>
                 <label htmlFor="email" className="block text-sm text-gray-600">
                   Email
                 </label>
                 <input
                   type="email"
                   id="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   required
                   placeholder="Enter your email"
                   className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
                 />
               </div>
               <div>
                 <label htmlFor="mobile" className="block text-sm text-gray-600">
                   Contact Number
                 </label>
                 <input
                   type="text"
                   id="mobile"
                   value={mobile}
                   onChange={(e) => setMobile(e.target.value)}
                   required
                   placeholder="Enter your mobile number"
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
                 Sign Up
               </button>
             </form>
             <div className="mt-4 text-center">
               <p className="text-sm text-gray-600">
                 Already have an account?{" "}
                 <Link to="/" className="text-blue-500 hover:underline font-medium">
                  Login
                 </Link>
               </p>
             </div>
           </div>
         </div>
       </div>
  );
};

export default SignUp;
