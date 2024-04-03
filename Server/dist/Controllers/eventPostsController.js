"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlikeEventPost = exports.likeEventPost = exports.createEventPost = exports.getEventPostsInAllSocieties = void 0;
const EventPosts_1 = require("../Data/EventPosts");
const Societies_1 = require("../Data/Societies");
const UserLikesEventPosts_1 = require("../Data/UserLikesEventPosts");
const UserLikesEventReplies_1 = require("../Data/UserLikesEventReplies");
const getEventPostsInAllSocieties = async (req, res) => {
    try {
        const userId = req.user.id;
        const page = parseInt(req.query.page) || 1;
        const limit = 25;
        const offset = (page - 1) * limit;
        const [eventPosts, total] = await EventPosts_1.EventPosts.findAndCount({
            relations: ['user', 'society', 'eventReplies', 'eventReplies.user'],
            order: { timestamp: 'DESC' },
            skip: offset,
            take: limit,
        });
        const eventPostsWithData = await Promise.all(eventPosts.map(async (eventPost) => {
            const likesCount = await UserLikesEventPosts_1.UserLikesEventPosts.count({ where: { eventPost: { id: eventPost.id } } });
            const userLiked = await UserLikesEventPosts_1.UserLikesEventPosts.findOne({ where: { eventPost: { id: eventPost.id }, user: { id: userId } } });
            const repliesWithData = await Promise.all(eventPost.eventReplies.map(async (reply) => {
                const replyLikesCount = await UserLikesEventReplies_1.UserLikesEventReplies.count({ where: { eventReply: { id: reply.id } } });
                const userLikedReply = await UserLikesEventReplies_1.UserLikesEventReplies.findOne({ where: { eventReply: { id: reply.id }, user: { id: userId } } });
                return {
                    replyId: reply.id,
                    replyContent: reply.content,
                    timestamp: reply.timestamp,
                    user: {
                        id: reply.user.id,
                        displayName: reply.user.displayName,
                    },
                    likesCount: replyLikesCount,
                    isLiked: !!userLikedReply,
                };
            }));
            repliesWithData.sort((a, b) => b.likesCount - a.likesCount);
            return {
                eventsPostId: eventPost.id,
                eventsPostContent: eventPost.content,
                timestamp: eventPost.timestamp,
                eventType: eventPost.eventType,
                eventLocation: eventPost.location,
                eventTime: eventPost.eventTime,
                societyId: eventPost.society.id,
                societyName: eventPost.society.societyName,
                user: {
                    id: eventPost.user.id,
                    displayName: eventPost.user.displayName,
                },
                likesCount,
                isLiked: !!userLiked,
                replyCount: eventPost.eventReplies.length,
                replies: repliesWithData,
            };
        }));
        const totalPages = Math.ceil(total / limit);
        res.json({
            eventPosts: eventPostsWithData,
            currentPage: page,
            totalPages: totalPages,
        });
    }
    catch (error) {
        console.error('Error fetching event posts:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getEventPostsInAllSocieties = getEventPostsInAllSocieties;
const createEventPost = async (req, res) => {
    try {
        const { content, societyId, eventType, eventLocation, eventTime, timestamp } = req.body;
        const userId = req.user.id;
        const society = await Societies_1.Societies.findOne({ where: { id: societyId } });
        if (!society) {
            return res.status(404).json({ message: 'Society not found' });
        }
        const eventPost = EventPosts_1.EventPosts.create({
            content: content,
            eventType,
            location: eventLocation,
            eventTime,
            timestamp,
            society,
            user: { id: userId },
        });
        await EventPosts_1.EventPosts.save(eventPost);
        res.json({ eventsPostId: eventPost.id });
    }
    catch (error) {
        console.error('Error creating event post:', error);
        throw new Error('Failed to create event post');
    }
};
exports.createEventPost = createEventPost;
const likeEventPost = async (req, res) => {
    try {
        const eventPostId = parseInt(req.params.eventPostId);
        const userId = req.user.id;
        const eventPost = await EventPosts_1.EventPosts.findOne({ where: { id: eventPostId } });
        if (!eventPost) {
            return res.status(404).json({ message: 'Event post not found' });
        }
        const existingLike = await UserLikesEventPosts_1.UserLikesEventPosts.findOne({ where: { eventPost: { id: eventPostId }, user: { id: userId } } });
        if (existingLike) {
            return res.status(400).json({ message: 'Event post already liked' });
        }
        const newLike = UserLikesEventPosts_1.UserLikesEventPosts.create({ eventPost: { id: eventPostId }, user: { id: userId } });
        await newLike.save();
        res.json({ message: 'Event post liked successfully' });
    }
    catch (error) {
        console.error('Error liking event post:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.likeEventPost = likeEventPost;
const unlikeEventPost = async (req, res) => {
    try {
        const eventPostId = parseInt(req.params.eventPostId);
        const userId = req.user.id;
        const like = await UserLikesEventPosts_1.UserLikesEventPosts.findOne({ where: { eventPost: { id: eventPostId }, user: { id: userId } } });
        if (!like) {
            return res.status(400).json({ message: 'Event post not liked' });
        }
        await UserLikesEventPosts_1.UserLikesEventPosts.remove(like);
        res.json({ message: 'Event post unliked successfully' });
    }
    catch (error) {
        console.error('Error unliking event post:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.unlikeEventPost = unlikeEventPost;
