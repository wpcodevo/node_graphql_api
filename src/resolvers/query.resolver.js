import authController from '../controllers/auth.controller.js';
import userController from '../controllers/user.controller.js';

export default {
  // Users
  getMe: userController.getMe,
  // Auth
  refreshAccessToken: authController.refreshAccessToken,
  logoutUser: authController.logoutHandler,
};
