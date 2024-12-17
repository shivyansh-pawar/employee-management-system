const bcrypt = require('bcrypt');
const User = require('../Models/User')


const signup = async(req , res) =>{
       const {username , email , password , mobileNumber} = req.body;
    try {
        
        //check if user is already exist
        const userExist = await User.findOne({email});

        if(userExist){
            return res.status(400).json({error:'user is already exist'})
        }

        //hashed the password the before saving 
        console.log('Plain Password:', password);
        const hashedPassword = await bcrypt.hash(password,10);
        console.log('Hashed Password:', hashedPassword);

        //create new user document 
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            mobileNumber,
        })

       const response = await newUser.save();
         
        res.status(200).json(response)

    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Internal Server Error'})
    }
}

module.exports = {signup}