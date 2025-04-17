const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const {validateRegister, validateLogin} = require('../middleware/validation');

router.post('/register', validateRegister, authController.register);

router.post('/login', validateLogin, authController.login);

router.post('/forgot-password', authController.forgotPassword);

router.post('/reset-password', authController.resetPassword);

router.get('/me', auth, authController.getCurrentUser);

module.exports = router;