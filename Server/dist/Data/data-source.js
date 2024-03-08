"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Posts_1 = require("./Posts");
const Replies_1 = require("./Replies");
const RepliesUser_1 = require("./RepliesUser");
const UserPosts_1 = require("./UserPosts");
dotenv_1.default.config();
exports.Database = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [
        User_1.User,
        Posts_1.Posts,
        Replies_1.Replies,
        RepliesUser_1.RepliesUser,
        UserPosts_1.UserPosts
    ],
    ssl: false
});
