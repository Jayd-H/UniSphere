"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccount = exports.changePassword = exports.changeDisplayName = exports.changeUsername = exports.getUserDetails = void 0;
const Users_1 = require("../Data/Users");
const UserSocieties_1 = require("../Data/UserSocieties");
const Replies_1 = require("../Data/Replies");
const Posts_1 = require("../Data/Posts");
const EventReplies_1 = require("../Data/EventReplies");
const EventPosts_1 = require("../Data/EventPosts");
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_validator_1 = require("express-validator");
const getUserDetails = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await Users_1.Users.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const societyCount = await UserSocieties_1.UserSocieties.count({ where: { userId } });
        const replyCount = await Replies_1.Replies.count({ where: { user: { id: userId } } });
        const regularPostCount = await Posts_1.Posts.count({ where: { user: { id: userId } } });
        const eventReplyCount = await EventReplies_1.EventReplies.count({ where: { user: { id: userId } } });
        const eventPostCount = await EventPosts_1.EventPosts.count({ where: { user: { id: userId } } });
        res.status(200).json({
            success: true,
            data: {
                username: user.userName,
                displayName: user.displayName,
                societyCount,
                replyCount,
                regularPostCount,
                eventReplyCount,
                eventPostCount,
            },
        });
    }
    catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.getUserDetails = getUserDetails;
const changeUsername = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { newUsername, password } = req.body;
        const userId = req.user.id;
        const user = await Users_1.Users.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.hash);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }
        user.userName = newUsername;
        await user.save();
        res.status(200).json({ success: true, message: "Username changed successfully" });
    }
    catch (error) {
        console.error("Error changing username:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.changeUsername = changeUsername;
const changeDisplayName = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { newDisplayName, password } = req.body;
        const userId = req.user.id;
        console.log("newdisplayname", newDisplayName, "password", password, "userid", userId);
        const user = await Users_1.Users.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.hash);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }
        user.displayName = newDisplayName;
        await user.save();
        res.status(200).json({ success: true, message: "Display name changed successfully" });
    }
    catch (error) {
        console.error("Error changing display name:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.changeDisplayName = changeDisplayName;
const changePassword = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.id;
        const user = await Users_1.Users.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const isPasswordValid = await bcrypt_1.default.compare(currentPassword, user.hash);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid current password" });
        }
        const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
        user.hash = hashedPassword;
        await user.save();
        res.status(200).json({ success: true, message: "Password changed successfully" });
    }
    catch (error) {
        console.error("Error changing password:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.changePassword = changePassword;
const deleteAccount = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const userId = req.user.id;
        const { password } = req.body;
        const user = await Users_1.Users.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.hash);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }
        await user.remove();
        res.status(200).json({ success: true, message: "Account deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting account:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.deleteAccount = deleteAccount;
