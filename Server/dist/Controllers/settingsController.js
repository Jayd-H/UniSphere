"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = void 0;
const Users_1 = require("../Data/Users");
const bcrypt_1 = __importDefault(require("bcrypt"));
const changePassword = async (req, res) => {
    try {
        const { userName, password, newPassword } = req.body.json;
        if (!userName || !password) {
            return res.status(400).json({ error: "Missing required fields (username and password)" });
        }
        const user = await Users_1.Users.findOne({ where: { userName } });
        if (!user) {
            return res.status(401).json({ error: "Invalid username or password" });
        }
        if (user.hash) {
            const isPasswordValid = await bcrypt_1.default.compare(password, user.hash);
            if (!isPasswordValid) {
                return res.status(401).json({ error: "Invalid username or password" });
            }
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt_1.default.hash(newPassword, saltRounds);
        user.hash = hashedPassword;
        await user.save();
        res.status(200).json({ message: "Password changed successfully" });
    }
    catch (error) {
        console.error("Error changing password:", error);
        res.status(500).json({ error: "An error occurred while changing password" });
    }
};
exports.changePassword = changePassword;
