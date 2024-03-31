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
const Users_1 = require("./Users");
const Societies_1 = require("./Societies");
const Replies_1 = require("./Replies");
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
    (0, typeorm_1.Column)("timestamp", { default: () => "CURRENT_TIMESTAMP" })
], Posts.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Societies_1.Societies, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: "societyId" })
], Posts.prototype, "society", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: "userId" })
], Posts.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Replies_1.Replies, reply => reply.post)
], Posts.prototype, "replies", void 0);
exports.Posts = Posts = __decorate([
    (0, typeorm_1.Entity)({ database: "unisphere", name: "posts" })
], Posts);
