import { Router } from 'express';
import { authenticateToken } from '../Middleware/authMiddleware';
import { getUserSocieties } from '../Controllers/societyController';
import { getAllSocieties } from '../Controllers/societyController';

const router = Router();

router.get('/all', getAllSocieties);
router.get('/user', authenticateToken, getUserSocieties);

export default router;