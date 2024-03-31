"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlikeEventPost = exports.likeEventPost = exports.fetchEventPosts = void 0;
const EventPosts_1 = require("../Data/EventPosts");
const UserLikesEventPosts_1 = require("../Data/UserLikesEventPosts");
const typeorm_1 = require("typeorm");
// Fetch event posts for given society IDs
const fetchEventPosts = async (req, res) => {
    var _a;
    try {
        const societyIds = (_a = req.query.societyIds) === null || _a === void 0 ? void 0 : _a.toString().split(',').map(Number);
        const eventPosts = await EventPosts_1.EventPosts.find({
            where: {
                societyId: societyIds ? (0, typeorm_1.In)(societyIds) : undefined,
            },
            relations: ['user', 'society'],
        });
        res.json(eventPosts);
    }
    catch (error) {
        console.error('Error fetching event posts:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.fetchEventPosts = fetchEventPosts;
// Like an event post
const likeEventPost = async (req, res) => {
    try {
        const eventPostId = parseInt(req.params.eventPostId);
        const userId = req.user.id;
        const eventPost = await EventPosts_1.EventPosts.findOneBy({ id: eventPostId });
        if (!eventPost) {
            return res.status(404).json({ message: 'Event post not found' });
        }
        const like = await UserLikesEventPosts_1.UserLikesEventPosts.findOne({ where: { eventPostId, userId } });
        if (like) {
            return res.status(400).json({ message: 'Event post already liked' });
        }
        const newLike = UserLikesEventPosts_1.UserLikesEventPosts.create({ eventPostId, userId });
        await newLike.save();
        res.json({ message: 'Event post liked successfully' });
    }
    catch (error) {
        console.error('Error liking event post:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.likeEventPost = likeEventPost;
// Unlike an event post
const unlikeEventPost = async (req, res) => {
    try {
        const eventPostId = parseInt(req.params.eventPostId);
        const userId = req.user.id;
        const like = await UserLikesEventPosts_1.UserLikesEventPosts.findOne({ where: { eventPostId, userId } });
        if (!like) {
            return res.status(400).json({ message: 'Event post not liked' });
        }
        await like.remove();
        res.json({ message: 'Event post unliked successfully' });
    }
    catch (error) {
        console.error('Error unliking event post:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.unlikeEventPost = unlikeEventPost;
