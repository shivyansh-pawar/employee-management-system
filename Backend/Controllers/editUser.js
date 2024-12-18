const User = require('../Models/User');

const edituser = async (req, res) => {
    try {

        const currentUser = req.user;
        const user = await User.findByIdAndUpdate(currentUser._id)

        if (!user) {
            return res.status(401).json({ Error: 'User not found' })
        }

        if (!req.body.edituser) {
            return res.status(401).send('Data is required')
        }

        const { _id, username, email, profile, mobileNumber } = req.body.edituser;
        console.log('req.body.editUser:', req.body.edituser)

        //chek email exist
        const existEmail = await User.findOne({
            email,
            _id: { $ne: id }
        })

        if (existEmail) {
            return res.status(401).send('Email already exist!')
        }

        //find existing employee by id
        const existUser = await User.findOne(_id)

        if (!existUser) {
            return res.status(404).send("user not found")
        }

        const updateUser = await User.findByIdAndUpdate(
            _id,
            {
             
                username,
                email,
                profile,
                mobileNumber,
            },
         {new:true}
        );

        console.log('user update successfully',updateUser);

        res.status(200).json({
            success: true,
            message:"user update successfully",updateUser
        })
    } catch (error) {
        
        console.log(error);
        res.status(500).json({error:'Internal server error'})
    }
}

module.exports = {edituser}