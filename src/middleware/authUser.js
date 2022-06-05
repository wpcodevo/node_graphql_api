import { ForbiddenError } from 'apollo-server-core';
import errorHandler from '../controllers/error.controller.js';
import userModel from '../models/user.model.js';
import redisClient from '../utils/connectRedis.js';
import { verifyJwt } from '../utils/jwt.js';

const authUser = async (req) => {
  try {
    // Get the access token
    let access_token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      access_token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.access_token) {
      const { access_token: token } = req.cookies;
      access_token = token;
    }

    if (!access_token) return false;

    // Validate the Access token
    const decoded = verifyJwt(access_token, 'JWT_ACCESS_PUBLIC_KEY');

    if (!decoded) return false;

    // Check if the session is valid
    const session = await redisClient.get(decoded.user);

    if (!session) {
      throw new ForbiddenError('Session has expired');
    }

    // Check if user exist
    const user = await userModel
      .findById(JSON.parse(session).id)
      .select('+verified');

    if (!user || !user.verified) {
      throw new ForbiddenError(
        'The user belonging to this token no logger exist'
      );
    }

    return user;
  } catch (error) {
    errorHandler(error);
  }
};

export default authUser;
