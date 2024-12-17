const jwt = require('jsonwebtoken')


const jwtAuthMiddlerWare = (req , res , next)=>{
    //extract the token from request header
    const authorization = req.headers.authorization

    if(!authorization){
        return res.status(401).json({error:'Token nout Found'})
    }

    const token = req.headers.authorization.split('')[1]

    if(!token){
        return res.status(401).json({error:'Unauthorized'})
    }

    try {
        //verify jwt token
        const decode = jwt.verify(token,process.env.JWT_SECRET);

        //attached the use information
        req.user = decode
        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({error:'Invalid Token'})
    }
}

   
    //generate token
    const generateToken = (userData) =>{
        //generate new jwt token 

        return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:'7d'})
    }

    module.exports = {jwtAuthMiddlerWare,generateToken}