
const User = require('../Models/User');
const Emp = require('../Models/Employe')

const createEmployee = async (req, res) => {
    try {
       
        const currentUser = req.user;
        const user = await User.findById(currentUser._id);

        if (!user) {
            return res.status(401).json({ error: 'User not found' })
        }
        const {
            f_Name,
            f_Email,
            f_Mobile,
            f_Designation,
            f_gender,
            f_Course,
            f_Createdate,
            f_Image,
        } = req.body.formData;
        // console.log("Name and Email:", f_Name, f_Email);

        //if formdata exits
        if(!req.body.formData){
            return res.status(401).json({error:'formdata is required'})
        }
          
        //required field
        if(!f_Name || !f_Email){
            return res.status(401).json({error:'Employe name and email are required'})
        }

        //check if employe with the same email already exist
        const employeExist = await Emp.findOne({f_Email});

        if(employeExist){
            return res.status(401).json({error:'Employee with this email is already exist'})
        }

        //create new document with user._id as employee id
        const newEmployee = new Emp({
            f_Name,
            f_Email,
            f_Mobile,
            f_Designation,
            f_gender,
            f_Course,
            f_Createdate,
            f_Image,
            employeeId: user._id, // Assign the user's ID as employeeId
        }) 

        //save the empolyee to the database 
        await newEmployee.save();

        console.log("employee created succefully");

        res.status(200).json({
            success: true,
            message: 'Employee Created Successfully',
            data: newEmployee,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal Server error",error})
    }
}

module.exports = {createEmployee};