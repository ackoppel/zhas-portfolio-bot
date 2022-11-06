import * as Joi from '@hapi/joi';
import { DatabaseConfig } from './database/database.config';

export const configValidationSchema = Joi.object({
  BOT_API_URL: Joi.string().required(),
  TOKEN: Joi.string().required(),
  SEND_BASE_COMMANDS: Joi.boolean().required(),
  SEND_WEBHOOK: Joi.boolean().required(),

  PORT: Joi.number().required(),
  BASE_PATH: Joi.string().required(),
  PASSWORD: Joi.string().required(),

  BULL_USERNAME: Joi.string().required(),
  BULL_PASSWORD: Joi.string().required(),

  ...DatabaseConfig.getValidationSchema(),
});
