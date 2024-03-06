"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPosts = void 0;
const typeorm_1 = require("typeorm");
const Posts_1 = require("./Posts");
const User_1 = require("./User");
let UserPosts = class UserPosts extends typeorm_1.BaseEntity {
};
exports.UserPosts = UserPosts;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)()
], UserPosts.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Posts_1.Posts, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: "idposts" })
], UserPosts.prototype, "PostsID", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User_1.User, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: "id" })
], UserPosts.prototype, "UsersID", void 0);
exports.UserPosts = UserPosts = __decorate([
    (0, typeorm_1.Entity)({ database: "unisphere", name: "userposts" })
], UserPosts);
