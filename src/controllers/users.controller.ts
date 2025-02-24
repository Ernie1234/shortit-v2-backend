import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';

import logger from '../logs/logger';
import { invalidCredentialsMsg, serverErrorMsg } from '../constants/messages';
import HTTP_STATUS from '../constants/http-status';
import User from '../models/user';
import { generateTokenAndSetCookies } from '../utils/generate-functions';

export const getUsers = async (req: Request, res: Response) => {
  try {
    return res.status(200).send({ message: 'Get all users' });
  } catch (error) {
    logger.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: serverErrorMsg
    });
  }
};

//  LOGIN OR SIGNIN USER
export const signInUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email
    });
    if (!user) {
      logger.error(invalidCredentialsMsg);
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: invalidCredentialsMsg
      });
    }

    // Ensure user.password is a string before comparing
    if (typeof user.password !== 'string') {
      logger.error('User password is not a string');
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: serverErrorMsg
      });
    }
    // Compare provided password with stored hashed password
    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      logger.error(invalidCredentialsMsg);
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: invalidCredentialsMsg
      });
    }

    // Generate token and set cookies
    const token = generateTokenAndSetCookies(res, user.id);
    logger.info('Generated token and set cookies:', token);

    user.lastLogin = new Date();
    await user.save();

    const userObject = user.toObject();

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Sign-in successful',
      user: {
        ...userObject,
        password: undefined
      }
    });
  } catch (error) {
    logger.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: serverErrorMsg
    });
  }
};
