"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserData = void 0;
const Users_1 = require("../Data/Users");
const getUserData = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await Users_1.Users.findOne({ where: { id: userId }, relations: ['societies'] });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const userData = {
            id: user.id,
            userName: user.userName,
            displayName: user.displayName,
            societies: user.societies,
        };
        res.status(200).json({ success: true, user: userData });
    }
    catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.getUserData = getUserData;
