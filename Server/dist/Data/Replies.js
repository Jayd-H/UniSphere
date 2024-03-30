"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Replies = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Posts_1 = require("./Posts");
let Replies = class Replies extends typeorm_1.BaseEntity {
};
exports.Replies = Replies;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment")
], Replies.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 512 })
], Replies.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 32 })
], Replies.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.Column)("int")
], Replies.prototype, "likesNum", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: "id" })
], Replies.prototype, "UserID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Posts_1.Posts, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: "id" })
], Replies.prototype, "PostID", void 0);
exports.Replies = Replies = __decorate([
    (0, typeorm_1.Entity)({ database: "unisphere", name: "replies" })
], Replies);
