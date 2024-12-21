import React from "react";
import SignUpForm from "./pages/SignUp";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import {SnackbarProvider} from "notistack";

// Pages Components
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Leave from "./components/Leave";
import Profile from "./components/Profile";
import CreateEmployee from "./components/CreateEmployee";
import Employee from "./components/Employees";
// import './App.css'

function App() {
  return (
    <>
      {/* Snackbar for Notifications */}
      <SnackbarProvider
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={3000}
      />

   <Router>
    <Routes>
      <Route path="/" element={<SignIn/>}/>
      <Route path="/signup" element={<SignIn />} />
      <Route path="/getEmployeeData" element={<Dashboard/>}/>
      <Route path="employees" element={<Employee />} />
      <Route path="leave" element={<Leave />} />
      <Route path="profile" element={<Profile />} />
      <Route path="createEmployee" element={<CreateEmployee />} />

      </Routes>
   </Router>
   </>
  )
}

export default App;

