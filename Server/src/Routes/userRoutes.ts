import { Router } from 'express';
import { authenticateToken } from '../Middleware/authMiddleware';
import { getUserData, fetchUserDisplayName, getUserJoinedSocieties } from '../Controllers/userController';

const router = Router();

router.get('/', authenticateToken, getUserData);
router.get('/:userId/societies', authenticateToken, getUserJoinedSocieties);
router.get('/users/:userId/displayName', fetchUserDisplayName);

export default router;