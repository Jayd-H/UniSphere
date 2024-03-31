import { Router } from 'express';

import { changePassword } from '../Controllers/settingsController';

const router = Router();
router.post('/changePassword', changePassword);

export default router;