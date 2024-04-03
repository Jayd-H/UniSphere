import { Router } from 'express';
import { authenticateToken } from '../Middleware/authMiddleware';
import { getPostsInSociety, createPost, likePost, unlikePost, } from '../Controllers/postsController';
import { createReply, likeReply, unlikeReply } from '../Controllers/repliesController';

const router = Router();

router.get('/posts', authenticateToken, getPostsInSociety);
router.post('/posts', authenticateToken, createPost);
router.post('/posts/:postId/like', authenticateToken, likePost);
router.delete('/posts/:postId/like', authenticateToken, unlikePost);

// Replies routes
router.post('/posts/:postId/replies', authenticateToken, createReply);
router.post('/replies/:replyId/like', authenticateToken, likeReply);
router.delete('/replies/:replyId/like', authenticateToken, unlikeReply);

export default router;