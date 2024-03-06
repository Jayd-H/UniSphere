"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepliesUser = void 0;
const typeorm_1 = require("typeorm");
const Replies_1 = require("./Replies");
const Posts_1 = require("./Posts");
const User_1 = require("./User");
let RepliesUser = class RepliesUser extends typeorm_1.BaseEntity {
};
exports.RepliesUser = RepliesUser;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)()
], RepliesUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Replies_1.Replies, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: "idreplies" })
], RepliesUser.prototype, "ReplyID", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Posts_1.Posts, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: "idposts" })
], RepliesUser.prototype, "PostID", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User_1.User, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: "id" })
], RepliesUser.prototype, "UserID", void 0);
exports.RepliesUser = RepliesUser = __decorate([
    (0, typeorm_1.Entity)({ database: "unisphere", name: "repliesuser" })
], RepliesUser);
