"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlikeReply = exports.likeReply = exports.createReply = void 0;
const Replies_1 = require("../Data/Replies");
const Posts_1 = require("../Data/Posts");
const UserLikesReplies_1 = require("../Data/UserLikesReplies");
const express_validator_1 = require("express-validator");
// Create a new reply
const createReply = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { content } = req.body;
        const postId = parseInt(req.params.postId);
        const userId = req.user.id;
        const post = await Posts_1.Posts.findOneBy({ id: postId });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const reply = Replies_1.Replies.create({ content, post, user: { id: userId } });
        await Replies_1.Replies.save(reply);
        res.json({ replyId: reply.id });
    }
    catch (error) {
        console.error('Error creating reply:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.createReply = createReply;
// Like a reply
const likeReply = async (req, res) => {
    try {
        const replyId = parseInt(req.params.replyId);
        const userId = req.user.id;
        const reply = await Replies_1.Replies.findOne({ where: { id: replyId }, relations: ['userLikes'] });
        if (!reply) {
            return res.status(404).json({ message: 'Reply not found' });
        }
        const existingLike = await UserLikesReplies_1.UserLikesReplies.findOne({ where: { reply: { id: replyId }, user: { id: userId } } });
        if (existingLike) {
            return res.status(400).json({ message: 'Reply already liked' });
        }
        const newLike = UserLikesReplies_1.UserLikesReplies.create({ reply: { id: replyId }, user: { id: userId } });
        await newLike.save();
        res.json({ message: 'Reply liked successfully' });
    }
    catch (error) {
        console.error('Error liking reply:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.likeReply = likeReply;
// Unlike a reply
const unlikeReply = async (req, res) => {
    try {
        const replyId = parseInt(req.params.replyId);
        const userId = req.user.id;
        const like = await UserLikesReplies_1.UserLikesReplies.findOne({ where: { reply: { id: replyId }, user: { id: userId } } });
        if (!like) {
            return res.status(400).json({ message: 'Reply not liked' });
        }
        await like.remove();
        res.json({ message: 'Reply unliked successfully' });
    }
    catch (error) {
        console.error('Error unliking reply:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.unlikeReply = unlikeReply;
