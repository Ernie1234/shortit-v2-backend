import Joi from 'joi';

const urlSchema = Joi.string()
  .uri({ scheme: ['http', 'https'] })
  .message('Invalid URL format. URL must start with http or https');

export const postUrlSchema = Joi.object({
  url: urlSchema.required().messages({
    'any.required': 'Url is required.',
  }),
  customName: Joi.string().optional().min(5).message('Must be at least 5 letters'),
});

export const updateUrlSchema = Joi.object({
  url: urlSchema.required().messages({
    'any.required': 'Url is required.',
  }),
  customName: Joi.string().optional().min(5).message('Must be at least 5 letters'),
});
