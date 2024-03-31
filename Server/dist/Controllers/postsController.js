"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlikePost = exports.likePost = exports.createPost = exports.getPostsInSociety = exports.getPostsInAllSocieties = void 0;
const typeorm_1 = require("typeorm");
const Posts_1 = require("../Data/Posts");
const Societies_1 = require("../Data/Societies");
const UserLikesPosts_1 = require("../Data/UserLikesPosts");
const UserLikesReplies_1 = require("../Data/UserLikesReplies");
const getPostsInAllSocieties = async (req, res) => {
    try {
        const societies = await Societies_1.Societies.find();
        const societyIds = societies.map(us => us.id);
        const posts = [];
        for (const societyId of societyIds) {
            const post = await Posts_1.Posts.find({ where: { id: societyId } });
            if (post) {
                posts.push(post);
            }
        }
        res.status(200).json({ success: true, data: posts });
    }
    catch (error) {
        console.error("Error fetching posts for societies:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.getPostsInAllSocieties = getPostsInAllSocieties;
const getPostsInSociety = async (req, res) => {
    var _a;
    try {
        const societyIdsString = ((_a = req.query.societyIds) === null || _a === void 0 ? void 0 : _a.toString()) || '';
        const societyIds = societyIdsString.split(',').map(Number).filter(id => !isNaN(id));
        const userId = req.user.id;
        const whereClause = societyIds.length > 0 ? { society: { id: (0, typeorm_1.In)(societyIds) } } : {};
        const posts = await Posts_1.Posts.find({
            where: whereClause,
            relations: ['user', 'society', 'replies', 'replies.user'],
        });
        const postsWithData = await Promise.all(posts.map(async (post) => {
            const likesCount = await UserLikesPosts_1.UserLikesPosts.count({ where: { postId: post.id } });
            const userLiked = await UserLikesPosts_1.UserLikesPosts.findOne({ where: { postId: post.id, userId } });
            const repliesWithData = await Promise.all(post.replies.map(async (reply) => {
                const replyLikesCount = await UserLikesReplies_1.UserLikesReplies.count({ where: { replyId: reply.id } });
                const userLikedReply = await UserLikesReplies_1.UserLikesReplies.findOne({ where: { replyId: reply.id, userId } });
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
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getPostsInSociety = getPostsInSociety;
// Create a new post
const createPost = async (req, res) => {
    try {
        const { content, societyId, timestamp } = req.body;
        const userId = req.user.id;
        const society = await Societies_1.Societies.findOne({ where: { id: societyId } });
        if (!society) {
            return res.status(404).json({ message: 'Society not found' });
        }
        const post = Posts_1.Posts.create({ content, society, user: { id: userId }, timestamp });
        await Posts_1.Posts.save(post);
        res.json(post);
    }
    catch (error) {
        console.error('Error creating post:', error);
        throw new Error('Failed to create post');
    }
};
exports.createPost = createPost;
// Like a post
const likePost = async (req, res) => {
    try {
        const postId = parseInt(req.params.postId);
        const userId = req.user.id;
        const post = await Posts_1.Posts.findOneBy({ id: postId });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const like = await UserLikesPosts_1.UserLikesPosts.findOne({ where: { postId, userId } });
        if (like) {
            return res.status(400).json({ message: 'Post already liked' });
        }
        const newLike = UserLikesPosts_1.UserLikesPosts.create({ postId, userId });
        await newLike.save();
        res.json({ message: 'Post liked successfully' });
    }
    catch (error) {
        console.error('Error liking post:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.likePost = likePost;
// Unlike a post
const unlikePost = async (req, res) => {
    try {
        const postId = parseInt(req.params.postId);
        const userId = req.user.id;
        const like = await UserLikesPosts_1.UserLikesPosts.findOne({ where: { postId, userId } });
        if (!like) {
            return res.status(400).json({ message: 'Post not liked' });
        }
        await like.remove();
        res.json({ message: 'Post unliked successfully' });
    }
    catch (error) {
        console.error('Error unliking post:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.unlikePost = unlikePost;
