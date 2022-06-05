import errorHandler from './error.controller.js';
import checkIsLoggedIn from '../middleware/checkIsLoggedIn.js';

const getMe = async (_, args, { req, getAuthUser }) => {
  try {
    await checkIsLoggedIn(req, getAuthUser);

    const user = await getAuthUser(req);

    return {
      status: 'success',
      user,
    };
  } catch (error) {
    errorHandler(error);
  }
};

export default {
  getMe,
};
