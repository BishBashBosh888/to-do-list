exports.validateRegister = (req, res, next) => {
    let { name, email, password, confirmPassword } = req.body;
    
    name = name?.trim();
    email = email?.trim().toLowerCase();

    req.body.name = name;
    req.body.email = email;

    const emailRegex = /^\S+@\S+\.\S+$/;
    const errors = [];

    if (!name) errors.push('Name is required');
    if (!email) errors.push('Email is required');
    if (!password) errors.push('Password is required');
    if (password && password.length < 6) errors.push('Password must be at least 6 characters');
    if (password !== confirmPassword) errors.push('Passwords do not match');
    if (email && !emailRegex.test(email)) errors.push('Please provide a valid email');
    
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    
    next();
};
  
exports.validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    next();
};