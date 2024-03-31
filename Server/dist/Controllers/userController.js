"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserJoinedSocieties = exports.fetchUserDisplayName = exports.getUserData = void 0;
const Users_1 = require("../Data/Users");
const Societies_1 = require("../Data/Societies");
const getUserData = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await Users_1.Users.findOne({ where: { id: userId }, relations: ['societies'] });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, user });
    }
    catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.getUserData = getUserData;
const fetchUserDisplayName = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const user = await Users_1.Users.findOneBy({ id: userId });
        if (user) {
            res.json({ displayName: user.displayName });
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        console.error('Error fetching user display name:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.fetchUserDisplayName = fetchUserDisplayName;
const getUserJoinedSocieties = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const user = await Users_1.Users.findOne({ where: { id: userId }, relations: ['societies'] });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const societyIds = user.societies.map(society => society.id);
        const societies = await Societies_1.Societies.findByIds(societyIds);
        res.status(200).json({ success: true, societies });
    }
    catch (error) {
        console.error("Error fetching user joined societies:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.getUserJoinedSocieties = getUserJoinedSocieties;
