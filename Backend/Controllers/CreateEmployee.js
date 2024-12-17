
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

        //if formdata exits
        if(!req.body.formData){
            return res.status(401).json({error:'formdata is required'})
        }
          
        //required field
        if(!f_Name || f_Email){
            return res.status(401).json({error:'Employe name and email are required'})
        }

        //check if employe with the same email already exist
        const employeExist = await Emp.findOne({f_Email});

        if(!employeExist){
            return res.status(401).json({error:'Employee with this email is already exist'})
        }
    } catch (error) {

    }
}