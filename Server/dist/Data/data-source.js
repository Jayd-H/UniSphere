"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
const Posts_1 = require("./Posts");
const Replies_1 = require("./Replies");
const Societies_1 = require("./Societies");
const UserSocieties_1 = require("./UserSocieties");
const UserLikesPosts_1 = require("./UserLikesPosts");
const UserLikesReplies_1 = require("./UserLikesReplies");
const UserLikesEventPosts_1 = require("./UserLikesEventPosts");
const EventPosts_1 = require("./EventPosts");
dotenv_1.default.config();
exports.Database = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [
        Users_1.Users,
        Posts_1.Posts,
        EventPosts_1.EventPosts,
        Replies_1.Replies,
        Societies_1.Societies,
        UserSocieties_1.UserSocieties,
        UserLikesPosts_1.UserLikesPosts,
        UserLikesReplies_1.UserLikesReplies,
        UserLikesEventPosts_1.UserLikesEventPosts
    ],
    ssl: false
});
