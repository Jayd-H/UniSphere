"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostsInSociety = exports.getPostsInAllSocieties = void 0;
const Posts_1 = require("../Data/Posts");
const UserSocieties_1 = require("../Data/UserSocieties");
const Societies_1 = require("../Data/Societies");
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
    try {
        const { userId } = req.body;
        const userSocieties = await UserSocieties_1.UserSocieties.findBy(userId);
        const societyIds = userSocieties.map((society) => society.id);
        const posts = await Promise.all(societyIds.map((id) => Posts_1.Posts.find({ where: { societyId: id } })));
        const allPosts = posts.flat();
        res.status(200).json({ success: true, data: allPosts });
    }
    catch (error) {
        console.error("Error fetching posts for societies:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.getPostsInSociety = getPostsInSociety;
