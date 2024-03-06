"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../Data/User");
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await User_1.User.passwordByUsername(username);
        const userRows = rows;
        if (userRows.length > 0) {
            const storedHash = userRows[0].hash;
            const isMatch = await bcrypt_1.default.compare(password, storedHash);
            if (isMatch) {
                res.json({ success: true, message: "Login successful" });
            }
            else {
                res.status(401).json({ success: false, message: "Invalid credentials" });
            }
        }
        else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    }
    catch (error) {
        console.error("Error verifying password:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.login = login;
const register = async (req, res) => {
    const { username, password, displayName } = req.body;
    try {
        const hash = await bcrypt_1.default.hash(password, 10);
        const user = new User_1.User();
        user.username = username;
        user.hash = hash;
        user.DisplayName = displayName;
        await user.save();
        res.json({ success: true, message: "User registered successfully." });
    }
    catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(409).json({ success: false, message: "Username is already taken." });
        }
        else {
            console.error("Error registering user:", error);
            res.status(500).json({ success: false, message: "Server error" });
        }
    }
};
exports.register = register;
