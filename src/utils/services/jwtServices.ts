import jwt from 'jsonwebtoken';
import logger from '@src/logs/logger';

import envConfig from '../../config/envConfig';

const { JWT_SECRET } = envConfig;

interface UserPayload {
  userId: string;
  role: string;
}
