import { Router } from 'express';
import { authenticateToken } from '../Middleware/authMiddleware';
import { getUserData } from '../Controllers/userController';

const router = Router();

router.get('/', authenticateToken, getUserData);

export default router;