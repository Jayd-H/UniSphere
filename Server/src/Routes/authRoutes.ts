import { Router } from 'express';
import { login } from '../Controllers/authController';
import { register } from '../Controllers/authController';

import { displayNameValidator, passwordValidator, usernameValidator } from '../Middleware/validationMiddleware';

const router = Router();

router.post('/login', usernameValidator, passwordValidator, login);
router.post('/register', usernameValidator, passwordValidator, displayNameValidator, register);

export default router;
