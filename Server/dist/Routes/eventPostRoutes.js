"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../Middleware/authMiddleware");
const eventPostsController_1 = require("../Controllers/eventPostsController");
const router = (0, express_1.Router)();
router.get('/events-posts', eventPostsController_1.fetchEventPosts);
router.post('/events-posts/:eventPostId/like', authMiddleware_1.authenticateToken, eventPostsController_1.likeEventPost);
router.delete('/events-posts/:eventPostId/like', authMiddleware_1.authenticateToken, eventPostsController_1.unlikeEventPost);
router.get('/events-posts/:eventPostId/likes');
exports.default = router;