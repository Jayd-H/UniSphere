"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventReplies = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
const EventPosts_1 = require("./EventPosts");
const UserLikesEventReplies_1 = require("./UserLikesEventReplies");
let EventReplies = class EventReplies extends typeorm_1.BaseEntity {
};
exports.EventReplies = EventReplies;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment")
], EventReplies.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 512 })
], EventReplies.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp", { default: () => "CURRENT_TIMESTAMP" })
], EventReplies.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, user => user.eventReplies, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: "userId" })
], EventReplies.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => EventPosts_1.EventPosts, eventPost => eventPost.eventReplies, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: "postId" })
], EventReplies.prototype, "eventPost", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UserLikesEventReplies_1.UserLikesEventReplies, userLikesEventReplies => userLikesEventReplies.eventReply)
], EventReplies.prototype, "userLikes", void 0);
exports.EventReplies = EventReplies = __decorate([
    (0, typeorm_1.Entity)({ database: "unisphere", name: "event_replies" })
], EventReplies);
