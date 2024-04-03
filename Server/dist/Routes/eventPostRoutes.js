"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../Middleware/authMiddleware");
const eventPostsController_1 = require("../Controllers/eventPostsController");
const eventRepliesController_1 = require("../Controllers/eventRepliesController");
const router = (0, express_1.Router)();
router.get('/eventsPosts', authMiddleware_1.authenticateToken, eventPostsController_1.getEventPostsInAllSocieties);
router.post('/eventsPosts', authMiddleware_1.authenticateToken, eventPostsController_1.createEventPost);
router.post('/eventsPosts/:eventPostId/like', authMiddleware_1.authenticateToken, eventPostsController_1.likeEventPost);
router.delete('/eventsPosts/:eventPostId/like', authMiddleware_1.authenticateToken, eventPostsController_1.unlikeEventPost);
// Event replies routes
router.post('/eventsPosts/:eventPostId/replies', authMiddleware_1.authenticateToken, eventRepliesController_1.createEventReply);
router.post('/eventsReplies/:replyId/like', authMiddleware_1.authenticateToken, eventRepliesController_1.likeEventReply);
router.delete('/eventsReplies/:replyId/like', authMiddleware_1.authenticateToken, eventRepliesController_1.unlikeEventReply);
exports.default = router;
