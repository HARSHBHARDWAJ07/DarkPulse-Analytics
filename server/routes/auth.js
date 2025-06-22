const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getCurrentUser,
  logout,
  changePassword
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const {
  validateRegister,
  validateLogin,
  validateChangePassword
} = require('../middleware/validation');

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.get('/me', protect, getCurrentUser);
router.post('/logout', protect, logout);
router.put('/change-password', protect, validateChangePassword, changePassword);

module.exports = router;