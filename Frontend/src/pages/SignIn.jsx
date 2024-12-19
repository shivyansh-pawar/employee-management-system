import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import Logo from "../assets/images/login.jpg";
import card from "../assets/images/card4.svg";


const SignIn = () => {

const[email,setEmail]=useState("");
const[password,setPassword]=useState("");
const[error,setError]=useState("");
const navigate=useNavigate();

const handleSubmit =async (e) =>{
    e.preventDefault();
    try{
        const response=await axios.post(`${APIURL}/signin`,{
            email,
            password,
        });
        const{token}=response.data;
        localStorage.setItem("token",token);
        localStorage.setItem("email",email);
        enqueueSnackbar("Login Successfully",{variant:"success"});
        navigate(`/getEmployeeData/employees`);
    }
    catch(error){
        const errorMessage=error.response?.error||"An error occurred.Please try again";
        setError(errorMessage);
        enqueueSnackbar(errorMessage,{variant:"error"});
    }
};


  return (
    <div className='flex items-center justify-center min-h-screen  bg-gradient-to-r from-blue-100 to-purple-50'>
<div className='grid grid-cols-1 md:grid-cols-2 max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden'>
    {/* Left Image Section */}
    <div className='hidden md:flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500'>
        <img src={card} alt="Card Illustration" className='w-3/4'/>
    </div>
    {/* Login form section */}
    <div className='p-8'>
        <div className='text-center mb-6'>
            <img src={Logo} alt="Logo" className='w-40 mx-auto '/>
            <h1 className='text-2xl font-bold text-gray-800'>
                Welcome <span className='text-blue-500'>Back!</span>
            </h1>
            <p className='text-gray-600'>Please log in to access your account</p>
        </div>
        {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
        <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
                <label htmlFor='email' className='block text-sm text-gray-600'>
                    Email
                </label>
                <input
                type='email'
                id='email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className='w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-blue-500'
                placeholder='Enter your email'
                required/>
            </div>

            <div>
                <label htmlFor='password' className='block text-sm text-gray-600'>
                    Password
                </label>
                <input
                type='password'
                id='password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className='w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-blue-500'
                placeholder='Enter your password'
                required/>
            </div>
            <button
            type='submit'
            className='w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition'
            >
                Login
            </button>
        </form>
        <p className='text-center mt-4 text-sm text-gray-600'>
            Don't have an account?{""}
            <a href='/signup' className='text-blue-500 hover:underline font-medium'>
            Sign Up</a>
        </p>
    </div>
</div>
    </div>
  )
}

export default SignIn
