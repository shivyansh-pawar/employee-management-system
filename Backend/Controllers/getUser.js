const User  = require('../Models/User');

const getUser = async (req , res) =>{

     try {
         
        //get current user data

     const currentUser = req.user
     
     //find the user in database with their id 

     const user = await User.findOne({_id: currentUser._id});

     if(!user){
        return res.status(401).send('user not found')
     }
      
     const employeeId = user._id;

     const employeCount = await User.countDocuments({employeeId: employeeId})

      res.json({
        user,
        count:employeCount
      })
     } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server error')
     }
}

module.exports = {getUser}