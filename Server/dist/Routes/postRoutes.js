"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../Middleware/authMiddleware");
const postsController_1 = require("../Controllers/postsController");
const repliesController_1 = require("../Controllers/repliesController");
const router = (0, express_1.Router)();
router.get('/posts', authMiddleware_1.authenticateToken, postsController_1.getPostsInSociety);
router.post('/posts', authMiddleware_1.authenticateToken, postsController_1.createPost);
router.post('/posts/:postId/like', authMiddleware_1.authenticateToken, postsController_1.likePost);
router.delete('/posts/:postId/like', authMiddleware_1.authenticateToken, postsController_1.unlikePost);
// Replies routes
router.post('/posts/:postId/replies', authMiddleware_1.authenticateToken, repliesController_1.createReply);
router.post('/replies/:replyId/like', authMiddleware_1.authenticateToken, repliesController_1.likeReply);
router.delete('/replies/:replyId/like', authMiddleware_1.authenticateToken, repliesController_1.unlikeReply);
exports.default = router;
