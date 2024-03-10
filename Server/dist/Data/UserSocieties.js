"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSocieties = void 0;
const typeorm_1 = require("typeorm");
const Societies_1 = require("./Societies");
const User_1 = require("./User");
let UserSocieties = class UserSocieties extends typeorm_1.BaseEntity {
};
exports.UserSocieties = UserSocieties;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment")
], UserSocieties.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => User_1.User, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: "id" })
], UserSocieties.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Societies_1.Societies, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: "id" })
], UserSocieties.prototype, "postId", void 0);
exports.UserSocieties = UserSocieties = __decorate([
    (0, typeorm_1.Entity)({ database: "unisphere", name: "usersocieties" })
], UserSocieties);
