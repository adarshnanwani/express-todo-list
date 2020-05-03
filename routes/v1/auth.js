const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  updatePassword,
  updateDetails,
  logout,
} = require('../controllers/auth');

const { protect } = require('../middleware/auth');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/me').get(protect, getMe);
router.route('/update').put(protect, updateDetails);
router.route('/forgotpassword').post(forgotPassword);
router.route('/resetpassword/:resetToken').put(resetPassword);
router.route('/changepassword').put(protect, updatePassword);

module.exports = router;
