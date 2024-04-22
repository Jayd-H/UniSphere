"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSocietyMemberCount = exports.leaveSociety = exports.joinSociety = exports.getSocietyPosts = exports.getSpecificSociety = exports.getUserSocieties = exports.getRecommendedSocieties = exports.getAllSocieties = void 0;
const UserSocieties_1 = require("../Data/UserSocieties");
const Societies_1 = require("../Data/Societies");
const data_source_1 = require("../Data/data-source");
const Posts_1 = require("../Data/Posts");
const UserLikesPosts_1 = require("../Data/UserLikesPosts");
const UserLikesReplies_1 = require("../Data/UserLikesReplies");
const getAllSocieties = async (req, res) => {
    try {
        const societies = await Societies_1.Societies.find();
        res.status(200).json({ success: true, data: societies });
    }
    catch (error) {
        console.error("Error fetching societies:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.getAllSocieties = getAllSocieties;
const getRecommendedSocieties = async (req, res) => {
    try {
        const userId = parseInt(req.query.userId);
        // Find the societies the user has not joined
        const userSocieties = await UserSocieties_1.UserSocieties.find({ where: { userId } });
        const joinedSocietyIds = userSocieties.map((us) => us.societyId);
        const recommendedSocieties = await Societies_1.Societies.createQueryBuilder("society")
            .where("society.id NOT IN (:...joinedSocietyIds)", { joinedSocietyIds })
            .orderBy("RAND()")
            .take(5)
            .getMany();
        res.status(200).json({ success: true, data: recommendedSocieties });
    }
    catch (error) {
        console.error("Error fetching recommended societies:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.getRecommendedSocieties = getRecommendedSocieties;
const getUserSocieties = async (req, res) => {
    try {
        const userSocieties = await UserSocieties_1.UserSocieties.find({ where: { userId: req.user.id } });
        if (!userSocieties || userSocieties.length === 0) {
            return res.status(200).json({ success: true, data: [] });
        }
        const societyIds = userSocieties.map((us) => us.societyId);
        const societies = [];
        for (const societyId of societyIds) {
            const society = await Societies_1.Societies.findOne({ where: { id: societyId } });
            if (society) {
                societies.push(society);
            }
            else {
                console.warn(`Society with id ${societyId} not found`);
            }
        }
        res.status(200).json({ success: true, data: societies });
        return societies;
    }
    catch (error) {
        console.error("Error fetching user societies:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.getUserSocieties = getUserSocieties;
const getSpecificSociety = async (req, res) => {
    var _a, _b;
    try {
        const societyId = ((_a = req.body) === null || _a === void 0 ? void 0 : _a.societyId) || ((_b = req.query) === null || _b === void 0 ? void 0 : _b.societyId);
        // Find society
        const society = await data_source_1.Database.getRepository(Societies_1.Societies).findOne({ where: { id: societyId } });
        // Handle non-existent society
        if (!society) {
            return res.status(404).json({ success: false, message: "Society not found" });
        }
        // Return retrieved society
        res.status(200).json({ success: true, data: society });
    }
    catch (error) {
        console.error("Error fetching society:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.getSpecificSociety = getSpecificSociety;
const getSocietyPosts = async (req, res) => {
    try {
        const societyId = parseInt(req.params.societyId);
        const userId = req.user.id;
        const posts = await Posts_1.Posts.find({
            where: { society: { id: societyId } },
            relations: ["user", "society", "replies", "replies.user"],
            order: { timestamp: "DESC" },
            take: 25,
        });
        const postsWithData = await Promise.all(posts.map(async (post) => {
            const likesCount = await UserLikesPosts_1.UserLikesPosts.count({ where: { post: { id: post.id } } });
            const userLiked = await UserLikesPosts_1.UserLikesPosts.findOne({ where: { post: { id: post.id }, user: { id: userId } } });
            const repliesWithData = await Promise.all(post.replies.map(async (reply) => {
                const replyLikesCount = await UserLikesReplies_1.UserLikesReplies.count({ where: { reply: { id: reply.id } } });
                const userLikedReply = await UserLikesReplies_1.UserLikesReplies.findOne({ where: { reply: { id: reply.id }, user: { id: userId } } });
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
                postId: post.id,
                postContent: post.content,
                timestamp: post.timestamp,
                societyId: post.society.id,
                societyName: post.society.societyName,
                user: {
                    id: post.user.id,
                    displayName: post.user.displayName,
                },
                likesCount,
                isLiked: !!userLiked,
                replyCount: post.replies.length,
                replies: repliesWithData,
            };
        }));
        res.json(postsWithData);
    }
    catch (error) {
        console.error("Error fetching society posts:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.getSocietyPosts = getSocietyPosts;
const joinSociety = async (req, res) => {
    try {
        const userId = req.user.id;
        const societyId = parseInt(req.params.societyId);
        const userSociety = new UserSocieties_1.UserSocieties();
        userSociety.userId = userId;
        userSociety.societyId = societyId;
        await userSociety.save();
        res.status(200).json({ success: true, message: "Joined society successfully" });
    }
    catch (error) {
        console.error("Error joining society:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.joinSociety = joinSociety;
const leaveSociety = async (req, res) => {
    try {
        const userId = req.user.id;
        const societyId = parseInt(req.params.societyId);
        const result = await UserSocieties_1.UserSocieties.delete({ userId, societyId });
        if (result.affected === 0) {
            return res.status(404).json({ success: false, message: "User or society not found" });
        }
        res.status(200).json({ success: true, message: "Left society successfully" });
    }
    catch (error) {
        console.error("Error leaving society:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.leaveSociety = leaveSociety;
const getSocietyMemberCount = async (req, res) => {
    try {
        const societyId = parseInt(req.params.societyId);
        const memberCount = await UserSocieties_1.UserSocieties.count({ where: { societyId } });
        res.status(200).json({ count: memberCount });
    }
    catch (error) {
        console.error("Error fetching society member count:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.getSocietyMemberCount = getSocietyMemberCount;
