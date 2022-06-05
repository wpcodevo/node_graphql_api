import authController from '../controllers/auth.controller.js';

export default {
  // Auth
  signupUser: authController.signup,
  loginUser: authController.login,
};
