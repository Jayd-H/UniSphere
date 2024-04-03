import { Router } from 'express';
import { authenticateToken } from '../Middleware/authMiddleware';
import { getUserSocieties, getAllSocieties, getSpecificSociety, getSocietyPosts, joinSociety, leaveSociety, getSocietyMemberCount } from '../Controllers/societyController';

const router = Router();

router.get('/all', getAllSocieties);
router.get('/user', authenticateToken, getUserSocieties);
router.get('/One', getSpecificSociety);
router.get('/:societyId/posts', authenticateToken, getSocietyPosts);

router.post('/:societyId/join', authenticateToken, joinSociety);
router.delete('/:societyId/leave', authenticateToken, leaveSociety);
router.get('/:societyId/members/count', getSocietyMemberCount);

export default router;