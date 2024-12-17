
const bcrypt = require('bcrypt');
const User = require('../Models/User');
const { generateToken } = require('../jwt');

const loginuser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and Password are required" });
    }

    try {
        // Check if user exists in database
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }


        const isMatched = await bcrypt.compare(password, user.password);

        if (!isMatched) {
            return res.status(400).json({ error: 'Incorrect Password' });
        }

        // JWT token generation
        const token = generateToken({ id: user._id, email: user.email });
        console.log('Generated token:', token);

        return res.json({ message: 'Login successful', token });

    } catch (error) {
        console.log('Error during sign-in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { loginuser };

