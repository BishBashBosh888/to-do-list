const jwt=require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = function(req,res,next){
    const token = req.header('x-auth-token');
    // console.log('Token from header:', token);
    if(!token){
        return res.status(401).json({error:'No token, authorization denied'});
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        // console.log('Decoded token:', decoded);
        req.user = decoded.user;
        next();
    }catch(error){
        // console.error('JWT verification error:', error.message);
        res.status(401).json({error:'Token is not valid'});
    }
};