import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";

// Pages Components
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Leave from "./components/Leave";
import Profile from "./components/Profile";
import CreateEmployee from "./components/CreateEmployee";
import Employee from "./components/Employees";

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
          {/* Public Routes */}
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes (Dashboard) */}
          <Route path="/dashboard" element={<Dashboard />}>
            {/* Nested Routes within Dashboard */}
            <Route path="employees" element={<Employee />} />
            <Route path="leave" element={<Leave />} />
            <Route path="profile" element={<Profile />} />
            <Route path="createEmployee" element={<CreateEmployee />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

