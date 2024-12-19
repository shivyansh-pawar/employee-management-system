import React,{useEffect,useState,UseState} from "react";
import { FaCamera } from "react-icons/fa";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import { APIURL } from "../utils/api";
import { useNavigate } from "react-router-dom";

const EmployerProfilePage=()=>{
    const[user,setUser]=useState(null);
    const[editUser,setEditUser]=useState({});
    const[isEditing,setIsEditing]=useState(false);
    const[error,setError]=useState("");
    const[profilePhoto,setProfilePhoto]=useState("url");
    const token=localStorage.getItem("token");
    const navigate=useNavigate();
    const fetchUser=async()=>{
        try{
            const response=await axios.get(`${APIURL}/getUser`,{
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            });
            setUser(response.data);
            setEditUser(response.data.user);
            setProfilePhoto(response.data.user.profile ||profilePhoto);
        }catch(error){
            if(
                error.response &&
                error.response.data &&
                error.responsse.data.error ==="Token expired"
            ){navigate("/");

            }else{
                console.error("Error Fetching data:",error);
            }
        }
    };
    useEffect(()=>{
        fetchUser();
    },[]);
    const handleEditSubmit=async(e)=>{
        e.preventDefault();
        try{
            await axios.put(
                `${APIURL}/editUser`,
                {editUser},
                {
                    headers:{
                        Authorization:`Bearer ${token}`,
                    },
                }
            );
            setError("");
            fetchUser();
            setIsEditing(false);
            enqueueSnackbar("Profile Updated",{variant:"success"});
        }catch(error){if(error.response && error.response.data){
            setError(error.response.data.message||"An error occured")
        }else{
            setError("An error occurred. Please try again");
        }
    }
    };
    const handleInputChange=(e)=>{
        const{name,value}=e.target;
        setEditUser({...editUser,[name]:value});
    };
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          setEditUser({ ...editUser, profile: reader.result });
          setProfilePhoto(reader.result);
        };
        if (file) {
          reader.readAsDataURL(file);
        }
      };
    
      return (
        <div className="min-h-screen flex justify-center items-center py-8 bg-gray-100">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96">
            <div className="flex items-center justify-between">
              <div className="relative">
                <img
                  src={profilePhoto} // Updated to use profilePhoto state
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover"
                />
                {isEditing && (
                  <label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-white p-2 rounded-full cursor-pointer">
                    <input
                      type="file"
                      id="photo-upload"
                      accept="image/*"
                      onChange={handleFileInputChange}
                      className="hidden"
                    />
                    <FaCamera className="text-xl text-gray-700" />
                  </label>
                )}
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-800">{user?.user?.username}</h2>
                <p className="text-gray-600">HR Manager</p>
              </div>
            </div>
    
            {isEditing ? (
              <form className="mt-6" onSubmit={handleEditSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Company Name</label>
                  <input
                    type="text"
                    name="username"
                    value={editUser.username || ""}
                    onChange={handleInputChange}
                    className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editUser.email || ""}
                    onChange={handleInputChange}
                    className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={editUser.mobileNumber || ""}
                    onChange={handleInputChange}
                    className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="mt-6">
                <div className="mb-4">
                  <h4 className="text-gray-800 font-medium">Total Employees</h4>
                  <p className="text-gray-600">{user?.count}</p>
                </div>
                <div className="mb-4">
                  <h4 className="text-gray-800 font-medium">Onboarded Since</h4>
                  <p className="text-gray-600">{new Date(user?.user?.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="mb-4">
                  <h4 className="text-gray-800 font-medium">Email</h4>
                  <p className="text-gray-600">{user?.user?.email}</p>
                </div>
                <div className="mb-4">
                  <h4 className="text-gray-800 font-medium">Phone</h4>
                  <p className="text-gray-600">{user?.user?.mobileNumber}</p>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </button>
                  <button className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                    Account Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    };
    
    export default EmployerProfilePage;