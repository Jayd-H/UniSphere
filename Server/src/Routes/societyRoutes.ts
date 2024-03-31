import { Router } from 'express';
import { authenticateToken } from '../Middleware/authMiddleware';
import { getUserSocieties, getAllSocieties, getSpecificSociety } from '../Controllers/societyController';
import { fetchEventPosts, likeEventPost, unlikeEventPost, } from '../Controllers/eventPostsController';

const router = Router();

router.get('/all', getAllSocieties);
router.get('/user', authenticateToken, getUserSocieties);
router.get('/One', getSpecificSociety);

export default router;