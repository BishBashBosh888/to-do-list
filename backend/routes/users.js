const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/', auth, userController.getAllUsers);

router.get('/:id', auth, userController.getUserById);

// handled by auth 
// router.post('/', auth, userController.createUser);

router.post('/:id', auth, userController.updateUser);

router.delete('/:id', auth, userController.deleteUser);


module.exports = router;