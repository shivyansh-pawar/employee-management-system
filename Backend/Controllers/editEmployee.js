const Emp = require('../Models/Employe');
const User = require('../Models/User');

const editEmployee = async(req , res)=>{
    try {
        
        const currentUser = req.user;
        const user = await User.findById(currentUser._id);

        if(!user){
            return res.status(401).json({error:'User not found'})
        }

        if(!req.body.editFormData){
            return res.status(400).send('Data is required')
        }

        const {
            _id,
            f_Name,
            f_Email,
            f_Mobile,
            f_Designation,
            f_gender,
            f_Course,
            f_Createdate,
            f_Image,
          } = req.body.editFormData;

        const existEmployeeEmail = await Emp.findOne({
            f_Email,
            _id: {$ne: _id},
        })
           
        if(existEmployeeEmail){
        res.status(401).send('Email is already exist')
        }
        //find the existing employee by id
        const existEmployee = await Emp.findById(_id);

        if(!existEmployee){
            return res.status(404).json({error:'Employee not found'})
        }

        const updateEmployee = await Emp.findByIdAndUpdate(

            _id,
            {
              f_Name,
              f_Email,
              f_Mobile,
              f_Designation,
              f_gender,
              f_Course,
              f_Createdate,
              f_Image,
            },
            { new: true }
        )

        console.log('Employee updated successfully',updateEmployee);

        res.status(200).json({
            success:true,
            message:'Employee updated successfully',
            updateEmployee
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server error'},error.message)
    }
}

module.exports = {editEmployee}