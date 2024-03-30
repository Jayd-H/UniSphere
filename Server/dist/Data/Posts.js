"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Posts = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Societies_1 = require("./Societies");
let Posts = class Posts extends typeorm_1.BaseEntity {
};
exports.Posts = Posts;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment")
], Posts.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 512 })
], Posts.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 32 })
], Posts.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.Column)("int")
], Posts.prototype, "likesNum", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Societies_1.Societies, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: "id" })
], Posts.prototype, "societyId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: "id" })
], Posts.prototype, "userId", void 0);
exports.Posts = Posts = __decorate([
    (0, typeorm_1.Entity)({ database: "unisphere", name: "posts" })
], Posts);
