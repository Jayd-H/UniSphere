"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
let User = class User extends typeorm_1.BaseEntity {
    static passwordByUsername(username) {
        return this.find({
            select: { hash: true },
            where: { username: username }
        });
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment")
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 32 })
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 72 })
], User.prototype, "hash", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 64 })
], User.prototype, "DisplayName", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)({ database: "unisphere", name: "user" })
], User);
