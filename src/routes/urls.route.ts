import { Router } from 'express';

import { createUrl, deleteUrl, getUrl, getUrls, updateUrl } from '@src/controllers/urls.controller';
import {
  validatePostUrl,
  validateUpdateRequest,
  validateUpdateUrl
} from '@src/middleware/url-validator';

const router = Router();

router.post('/shorten', validatePostUrl, createUrl);
router.get('/urls', getUrls);
router.get('/urls/:id', getUrl);
router.put('/urls/:id', validateUpdateUrl, validateUpdateRequest, updateUrl);
router.delete('/urls/:id', deleteUrl);

export default router;
