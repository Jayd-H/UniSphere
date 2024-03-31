import { Router } from 'express';
import { authenticateToken } from '../Middleware/authMiddleware';
import { fetchEventPosts, likeEventPost, unlikeEventPost } from '../Controllers/eventPostsController';

const router = Router();

router.get('/events-posts', fetchEventPosts);
router.post('/events-posts/:eventPostId/like', authenticateToken, likeEventPost);
router.delete('/events-posts/:eventPostId/like', authenticateToken, unlikeEventPost);
router.get('/events-posts/:eventPostId/likes');

export default router;