// const Emp = require('../Models/Employe');
// const User = require('../Models/User')

// const getEmployee = async (req, res) => {
//   try {
//     // Get the current user from the request (assuming user is authenticated)
//     const currentUser = req.user;


//     // Find the user in the database using their ID
//     const user = await User.findOne({ _id: currentUser._id });
   
//     if (!user) {
//       return res.status(401).json("User not found");
//     }

//     // If the user exists, continue fetching Employee data
//     const EmployeeId = user._id;
      

//     const employees = await Emp.find({ EmployeeId: user._id });
// console.log("Employees found for this User:", employees);

//     // Get page and pageSize from query parameters with default values
//     const page = parseInt(req.query.page) || 1;
//     const pageSize = parseInt(req.query.pageSize) || 5;
//     const search = req.query.search;

//     // Calculate skip and limit values
//     const skip = (page - 1) * pageSize;
//     const limit = pageSize;

//     // Build search criteria
//     let searchCriteria = { EmployeeId };

//     // If search query exists, add regex-based search for Employee fields
//     if (search) {
//       searchCriteria = {
//         EmployeeId,
//         $or: [
//           { f_Name: { $regex: search, $options: "i" } },
//           { email: { $regex: search, $options: "i" } },
//           // { f_Mobile: search },
//           { f_Designation: { $regex: search, $options: "i" } },
//           { f_gender: { $regex: search, $options: "i" } },
//           { f_Course: { $regex: search, $options: "i" } },
//         ],
//       };
//     }

//     // Fetch Employee data associated with the user (EmployeeId) and search criteria
//     const allData = await Emp.find(searchCriteria).skip(skip).limit(limit);

//     // Fetch total count of documents for this EmployeeId and search criteria
//     const totalCount = await Emp.countDocuments(searchCriteria);

//     // Calculate total pages
//     const totalPages = Math.ceil(totalCount / pageSize);

//     // Check if any data was found
//     if (allData.length === 0) {
//       return res.status(200).json("No data found.");
//     }

//     // Respond with paginated data and metadata
//     res.json({
//       page,
//       pageSize,
//       totalCount,
//       totalPages,
//       data: allData,
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).send("Internal server error.");
//   }
// };

// module.exports = { getEmployee };


const Emp = require('../Models/Employe'); // Employee model
const User = require('../Models/User'); // User model

// Function to get employee data
const getEmployee = async (req, res) => {
  try {
    // Step 1: Get the current user from the request (assuming user is authenticated)
    const currentUser = req.user;
    

    // Step 2: Find the user in the database using their ID
    const user = await User.findOne({ _id: currentUser._id });
    if (!user) {
      // If user not found, return 401 (Unauthorized)
      console.log("User not found for ID:", currentUser._id);
      return res.status(401).json("User not found");
    }
   ;

    // Step 3: Correct query to fetch employees
    // Use the exact field name `employeeId` from your database
    const employees = await Emp.find({ employeeId: user._id });
    

    // Step 4: If no employees found, respond with a friendly message
    if (employees.length === 0) {
      return res.status(200).json("No data found.");
    }

    // Step 5: Implement pagination
    const page = parseInt(req.query.page) || 1; // Default page = 1
    const pageSize = parseInt(req.query.pageSize) || 5; // Default page size = 5
    const skip = (page - 1) * pageSize;

    // Apply pagination and limit
    const paginatedEmployees = await Emp.find({ employeeId: user._id })
      .skip(skip)
      .limit(pageSize);

    // Calculate total count and pages
    const totalCount = await Emp.countDocuments({ employeeId: user._id });
    const totalPages = Math.ceil(totalCount / pageSize);

    // Step 6: Respond with paginated data
    res.json({
      page,
      pageSize,
      totalCount,
      totalPages,
      data: paginatedEmployees,
    });
  } catch (error) {
    // Step 7: Error handling
    console.error("Error in getEmployee function:", error);
    res.status(500).send("Internal server error.");
  }
};

module.exports = { getEmployee };
