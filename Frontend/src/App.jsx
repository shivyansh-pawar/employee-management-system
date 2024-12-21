import React from "react";

import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import {SnackbarProvider} from "notistack";

// Pages Components
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard/Dashboard";
import Leave from "./components/Leave/Leave";
import Profile from "./components/Profile/Profile";
import CreateEmployee from "./components/CreateEmployee/Create";
import Employee from "./components/Employee/Employees";
import SignUp from "./pages/SignUp";
// import './App.css'

function App() {



  return ( 
<>
  {/* Snackbar for Notification */}
  <SnackbarProvider
  anchorOrigin={{ vertical:"top", horizontal:"right"}}
  autoHideDuration={3000}
  />

   <Router>
    <Routes>
      <Route path="/" element={<SignIn/>}/>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/getEmployeeData" element={<Dashboard/>}>
      <Route path="employees" element={<Employee />} />
      <Route path="leave" element={<Leave />} />
      <Route path="profile" element={<Profile />} />
      </Route>

      </Routes>
   </Router>
   </>
  )
}

export default App
