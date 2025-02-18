import { Router } from 'express';

import users from './users.route';
import urls from './urls.route';

const router = Router();

router.use('/users', users);
router.use('/', urls);

export default router;
