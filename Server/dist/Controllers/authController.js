"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const data_source_1 = require("../Data/data-source");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../Data/User");
const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Username and password are required" });
    }
    try {
        const existingUser = await data_source_1.Database.getRepository(User_1.User).findOne({
            where: { username }
        });
        if (!existingUser) {
            console.error(`Login error: User with username '${username}' not found.`);
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const isMatch = await bcrypt_1.default.compare(password, existingUser.hash);
        if (isMatch) {
            // User authenticated, create JWT
            const userPayload = { id: existingUser.id, username: existingUser.username };
            // Assert ACCESS_TOKEN_SECRET is not undefined
            const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
            if (!accessTokenSecret) {
                console.error('ACCESS_TOKEN_SECRET is not defined.');
                return res.status(500).json({ success: false, message: "Server configuration error" });
            }
            const accessToken = jsonwebtoken_1.default.sign(userPayload, accessTokenSecret, { expiresIn: '1h' });
            console.log(`User '${username}' logged in successfully.`);
            res.status(200).json({ success: true, message: "Login successful", accessToken });
        }
        else {
            console.error(`Login error: Invalid credentials for user '${username}'.`);
            res.status(401).json({ success: false, message: "Invalid credentials" });
        }
    }
    catch (error) {
        console.error(`Login error: ${error.message}`, {
            username,
            error: error.stack,
        });
        res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.login = login;
const register = async (req, res) => {
    const { username, password, displayName } = req.body;
    try {
        const existingUser = await data_source_1.Database.getRepository(User_1.User).findOne({
            where: { username }
        });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "Username is already taken." });
        }
        // If username doesn't exist, proceed with creating the new user
        const hash = await bcrypt_1.default.hash(password, 10);
        const user = new User_1.User();
        user.username = username;
        user.hash = hash;
        user.displayName = displayName;
        await user.save();
        return res.status(200).json({ success: true, message: "User registered successfully." });
    }
    catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.register = register;
