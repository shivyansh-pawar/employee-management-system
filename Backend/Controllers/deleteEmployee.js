const User = require('../Models/User');
const Emp = require('../Models/Employe');


const deleteEmployee = async (req, res) => {

    try {
        
        const currentUser = req.user;

    const user = await User.findById(currentUser._id);

    if(!user){
       return res.status(401).json('User not found')
    }

    //retrieve the employee id 
    const employeeId = req.body._id;

    //find the existing employee
    const existingEmployee = await Emp.findById(employeeId);
    
    if(!existingEmployee){
       return res.status(404).send('Employee not found')
    }
    await Emp.deleteOne({_id: employeeId })

     console.log('User delete successfully', existingEmployee)

    res.status(200).json({message:'Employee delete successfully'})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server '})
    }


}

module.exports = {deleteEmployee}