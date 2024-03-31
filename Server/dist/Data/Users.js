"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
let Users = class Users extends typeorm_2.BaseEntity {
};
exports.Users = Users;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment")
], Users.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 32 })
], Users.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 72 })
], Users.prototype, "hash", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 64 })
], Users.prototype, "displayName", void 0);
exports.Users = Users = __decorate([
    (0, typeorm_1.Entity)({ name: "users" })
], Users);
