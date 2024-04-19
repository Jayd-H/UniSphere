import { Router } from 'express';
import { login } from '../Controllers/authController';
import { register } from '../Controllers/authController';

import { usernameValidator } from '../Middleware/validationMiddleware';

const router = Router();

router.post('/login', usernameValidator, login);
router.post('/register', usernameValidator, register);

export default router;
