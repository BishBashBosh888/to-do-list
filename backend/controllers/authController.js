const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const userModel = require('../models/userModel');

// Register a new user
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await userModel.getByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user
    const newUser = await userModel.create({ name, email, password });

    // Generate JWT token
    const payload = {
      user: {
        id: newUser.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ token });
      }
    );
  } catch (error) {
    console.error('Error in registration:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await userModel.getByEmail(email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await userModel.comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const payload = {
      user: {
        id: user.id
      }
    };

    // console.log('JWT expiresIn:', process.env.JWT_EXPIRATION);

    // parseInt(process.env.JWT_EXPIRATION,10)
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION },
      (err, token) => {
        if (err) throw err;
        res.json({ token,
          user:{
            id: user.id,
            name: user.name,
            email:user.email,
          }
         });
      }
    );
    
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.logout = (req, res) => {
  try {
    res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
// Get current user profile
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await userModel.getById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({user});
  } catch (error) {
    console.error('Error getting user profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.forgotPassword = async(req,res) =>{
  const {email} = req.body;
  try{
    const user = await userModel.getByEmail(email);
    if(!user){
      return res.status(404).json({error:'User not found'});
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 300000); // 5 mins expiry

    await userModel.setResetToken(user.id,token,expiry);

    res.status(200).json({message : 'Password token generated', token});
  }catch(error){
    console.error('Forgot Password error:',error);
    res.status(500).json({error:'Server error'});
  }
}

exports.resetPassword = async(req,res) =>{
  const {token,newPassword} = req.body;
  try{
    //check if token exists
    const user = await userModel.getUserByValidResetToken(token);
    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }
  
    await userModel.resetPasswordWithToken(token, newPassword);
    res.json({ message: 'Password has been reset successfully' });

  }catch(error){
    console.error('Reset password error:', error);
    res.status(500).json({error: 'Server error'});
  }
}