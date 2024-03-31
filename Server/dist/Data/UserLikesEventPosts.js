"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLikesEventPosts = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
const EventPosts_1 = require("./EventPosts");
let UserLikesEventPosts = class UserLikesEventPosts extends typeorm_1.BaseEntity {
};
exports.UserLikesEventPosts = UserLikesEventPosts;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment")
], UserLikesEventPosts.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: "id" })
], UserLikesEventPosts.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => EventPosts_1.EventPosts, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: "id" })
], UserLikesEventPosts.prototype, "eventPostId", void 0);
exports.UserLikesEventPosts = UserLikesEventPosts = __decorate([
    (0, typeorm_1.Entity)({ database: "unisphere", name: "user_likes_event_posts" })
], UserLikesEventPosts);
