import { Router } from 'express';

import { changePassword } from '../Controllers/settingsController';

const router = Router();
router.post('/pc', changePassword);

export default router;