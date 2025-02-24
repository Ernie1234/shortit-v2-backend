import { Router } from 'express';

import { getUsers, signInUser } from '../controllers/users.controller';

const router = Router();

router.get('/', getUsers);
router.post('/sign-in', signInUser);

export default router;
