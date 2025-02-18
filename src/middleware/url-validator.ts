import { Request, Response, NextFunction } from 'express';
import Joi, { Schema } from 'joi';
import { getUpdateParams } from '../utils/short-url-generator';
import HTTP_STATUS from '../utils/http-status';
import { notFoundMsg } from '../constants/messages';
import logger from '../logs/logger';
import { postUrlSchema, updateUrlSchema } from '@src/utils/validators/url-validator';

const formatJoiError = (error: Joi.ValidationError) => {
  const formattedError: { [key: string]: string } = {};
  // eslint-disable-next-line unicorn/no-array-for-each
  error.details.forEach((detail: Joi.ValidationErrorItem) => {
    formattedError[detail.path.join('.')] = detail.message;
  });
  return formattedError;
};

const validateFn = <T>(schema: Schema<T>, req: Request, res: Response, next: NextFunction) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(formatJoiError(error));
  }
  req.body = value as T;
  return next();
};

export const validatePostUrl = async (req: Request, res: Response, next: NextFunction) => {
  validateFn(postUrlSchema, req, res, next);
};

export const validateUpdateUrl = async (req: Request, res: Response, next: NextFunction) => {
  validateFn(updateUrlSchema, req, res, next);
};

export const validateUpdateRequest = (req: Request, res: Response, next: NextFunction) => {
  const { id, url, customName } = getUpdateParams(req);

  if (!id) {
    return res.status(HTTP_STATUS.NOT_FOUND).send({ message: notFoundMsg });
  }

  if (url) {
    return validateFn(updateUrlSchema, req, res, next);
  }

  if (!url && !customName) {
    logger.error('At least one field should be updated');
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .send({ message: 'At least one field should be updated' });
  }

  return next();
};
