import { Router } from 'express';
import { login } from '../Controllers/authController';
import { register } from '../Controllers/authController';

const router = Router();

router.post('/login', login);
router.post('/register', register);

export default router;
