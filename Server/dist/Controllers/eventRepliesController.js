"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlikeEventReply = exports.likeEventReply = exports.createEventReply = void 0;
const EventReplies_1 = require("../Data/EventReplies");
const EventPosts_1 = require("../Data/EventPosts");
const UserLikesEventReplies_1 = require("../Data/UserLikesEventReplies");
const express_validator_1 = require("express-validator");
const createEventReply = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { content } = req.body;
        const eventPostId = parseInt(req.params.eventPostId);
        const userId = req.user.id;
        const eventPost = await EventPosts_1.EventPosts.findOneBy({ id: eventPostId });
        if (!eventPost) {
            return res.status(404).json({ message: 'Event post not found' });
        }
        const reply = EventReplies_1.EventReplies.create({ content, eventPost, user: { id: userId } });
        await EventReplies_1.EventReplies.save(reply);
        res.json({ replyId: reply.id });
    }
    catch (error) {
        console.error('Error creating event reply:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.createEventReply = createEventReply;
const likeEventReply = async (req, res) => {
    try {
        const replyId = parseInt(req.params.replyId);
        const userId = req.user.id;
        const reply = await EventReplies_1.EventReplies.findOne({ where: { id: replyId } });
        if (!reply) {
            return res.status(404).json({ message: 'Event reply not found' });
        }
        const existingLike = await UserLikesEventReplies_1.UserLikesEventReplies.findOne({ where: { eventReply: { id: replyId }, user: { id: userId } } });
        if (existingLike) {
            return res.status(400).json({ message: 'Event reply already liked' });
        }
        const newLike = UserLikesEventReplies_1.UserLikesEventReplies.create({ eventReply: reply, user: { id: userId } });
        await UserLikesEventReplies_1.UserLikesEventReplies.save(newLike);
        res.json({ message: 'Event reply liked successfully' });
    }
    catch (error) {
        console.error('Error liking event reply:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.likeEventReply = likeEventReply;
const unlikeEventReply = async (req, res) => {
    try {
        const replyId = parseInt(req.params.replyId);
        const userId = req.user.id;
        const like = await UserLikesEventReplies_1.UserLikesEventReplies.findOne({ where: { eventReply: { id: replyId }, user: { id: userId } } });
        if (!like) {
            return res.status(400).json({ message: 'Event reply not liked' });
        }
        await UserLikesEventReplies_1.UserLikesEventReplies.remove(like);
        res.json({ message: 'Event reply unliked successfully' });
    }
    catch (error) {
        console.error('Error unliking event reply:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.unlikeEventReply = unlikeEventReply;
