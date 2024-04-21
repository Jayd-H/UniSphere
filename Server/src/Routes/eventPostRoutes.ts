import { Router } from 'express';
import { authenticateToken } from '../Middleware/authMiddleware';
import { getEventPostsInAllSocieties, createEventPost, likeEventPost, unlikeEventPost } from "../Controllers/eventPostsController";
import { createEventReply, likeEventReply, unlikeEventReply } from "../Controllers/eventRepliesController";
import { eventValidation, societyValidation, userMessageValidation } from '../Middleware/validationMiddleware';

const router = Router();

router.get('/eventsPosts', authenticateToken, getEventPostsInAllSocieties);
router.post('/eventsPosts', authenticateToken, userMessageValidation, societyValidation, eventValidation, createEventPost);
router.post('/eventsPosts/:eventPostId/like', authenticateToken, likeEventPost);
router.delete('/eventsPosts/:eventPostId/like', authenticateToken, unlikeEventPost);

// Event replies routes
router.post('/eventsPosts/:eventPostId/replies', authenticateToken, userMessageValidation, createEventReply);
router.post('/eventsReplies/:replyId/like', authenticateToken, likeEventReply);
router.delete('/eventsReplies/:replyId/like', authenticateToken, unlikeEventReply);

export default router;