"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLikesReplies = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
const Replies_1 = require("./Replies");
let UserLikesReplies = class UserLikesReplies extends typeorm_1.BaseEntity {
};
exports.UserLikesReplies = UserLikesReplies;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment")
], UserLikesReplies.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: "userId" })
], UserLikesReplies.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Replies_1.Replies, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: "replyId" })
], UserLikesReplies.prototype, "reply", void 0);
exports.UserLikesReplies = UserLikesReplies = __decorate([
    (0, typeorm_1.Entity)({ database: "unisphere", name: "user_likes_replies" })
], UserLikesReplies);
