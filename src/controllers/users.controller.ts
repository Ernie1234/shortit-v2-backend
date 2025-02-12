import { Request, Response } from 'express';

import logger from '../logs/logger';
import { serverErrorMsg } from '../constants/messages';
import HTTP_STATUS from '../constants/http-status';

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
